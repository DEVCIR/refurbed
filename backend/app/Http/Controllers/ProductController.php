<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    // GET: Fetch products with filtering & pagination
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('brand','category');

        // Filtering
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }
        if ($request->has('model_name')) {
            $query->where('model_name', 'like', '%' . $request->model_name . '%');
        }
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        if ($request->has('quantity')) {
            $query->where('quantity', $request->quantity);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10); // Default limit 10
        $offset = $request->get('offset', 0); // Default offset 0
        
        $products = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));

        $products->getCollection()->transform(function ($product) {
            if ($product->feature_imageUrl) {
                $product->feature_imageUrl = url(Storage::url($product->feature_imageUrl));
            }
            if ($product->all_imageUrls) {
                $allImageUrls = json_decode($product->all_imageUrls, true);
                $product->all_imageUrls = array_map(function($imageUrl) {
                    return url(Storage::url($imageUrl));
                }, $allImageUrls);
            }
            return $product;
        });

        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $products
        ]);
    }

    // POST: Create a new product with file uploads
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'model_name' => 'required|string|max:100|unique:products,model_name,NULL,id,brand_id,' . $request->brand_id,
            'description' => 'nullable|string',
            'quantity' => 'nullable|integer|min:1',
            'sku' => 'nullable|string',
            'category' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'feature_imageUrl' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'all_imageUrls.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Handling file uploads
        if ($request->hasFile('feature_imageUrl')) {
            $validated['feature_imageUrl'] = $request->file('feature_imageUrl')->store('products/feature_images', 'public');
        }

        if ($request->hasFile('all_imageUrls')) {
            $imagePaths = [];
            foreach ($request->file('all_imageUrls') as $image) {
                $imagePaths[] = $image->store('products/all_images', 'public');
            }
            $validated['all_imageUrls'] = json_encode($imagePaths);
        }

        $product = Product::create($validated);

        return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
    }

    // PUT: Update an existing product with file uploads
    public function update(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'model_name' => 'sometimes|string|max:100|unique:products,model_name,' . $product->id . ',id,brand_id,' . $request->brand_id,
            'description' => 'nullable|string',
            'sku' => 'nullable|string',
            'category' => 'nullable|string|max:50',
            'quantity' => 'nullable|integer',
            'is_active' => 'boolean',
            'feature_imageUrl' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'all_imageUrls.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Handling file uploads
        if ($request->hasFile('feature_imageUrl')) {
            Storage::delete('public/' . $product->feature_imageUrl);
            $validated['feature_imageUrl'] = $request->file('feature_imageUrl')->store('products/feature_images', 'public');
        }

        if ($request->hasFile('all_imageUrls')) {
            $imagePaths = [];
            foreach ($request->file('all_imageUrls') as $image) {
                $imagePaths[] = $image->store('products/all_images', 'public');
            }
            $validated['all_imageUrls'] = json_encode($imagePaths);
        }

        $product->update($validated);

        return response()->json(['message' => 'Product updated successfully', 'data' => $product]);
    }

    // DELETE: Remove a product and its images
    public function destroy(Product $product): JsonResponse
    {
        Storage::delete('public/' . $product->feature_imageUrl);
        $allImages = json_decode($product->all_imageUrls, true);
        if ($allImages) {
            foreach ($allImages as $image) {
                Storage::delete('public/' . $image);
            }
        }
        
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
