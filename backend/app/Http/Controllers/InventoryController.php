<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
{
    /**
     * GET: Fetch and filter inventory with pagination
     */


    // public function index(Request $request)
    // {
    //     $query = Inventory::with(['variant.product.brand', 'supplier.user']);
    
    //     // Filtering for Inventory fields
    //     $inventoryFilters = [
    //         'imei', 'serial_no', 'barcode', 'condition', 'purchase_price',
    //         'selling_price', 'discount_type', 'discount_price', 'wholesale_price',
    //         'purchase_order_no', 'supplier_id', 'stock_status', 'date_purchased',
    //         'date_sold', 'notes'
    //     ];
    
    //     foreach ($inventoryFilters as $field) {
    //         if ($request->has($field)) {
    //             $query->where($field, $request->input($field));
    //         }
    //     }
    
    //     // Filtering for ProductVariant fields
    //     $variantFilters = ['storage_gb', 'color', 'network_type'];
    
    //     if ($request->hasAny($variantFilters)) {
    //         $query->whereHas('variant', function ($q) use ($request, $variantFilters) {
    //             foreach ($variantFilters as $field) {
    //                 if ($request->has($field)) {
    //                     $q->where($field, $request->input($field));
    //                 }
    //             }
    //         });
    //     }
    
    //     // Filtering for Product fields
    //     $productFilters = ['model_name', 'product_description', 'sku', 'category'];
    
    //     if ($request->has('id')) {
    //         $query->where('id', $request->id);
    //     }

    //     if ($request->hasAny($productFilters)) {
    //         $query->whereHas('variant.product', function ($q) use ($request, $productFilters) {
    //             foreach ($productFilters as $field) {
    //                 if ($request->has($field)) {
    //                     $q->where($field, $request->input($field));
    //                 }
    //             }
    //         });
    //     }
    
    //     // Filtering for Brand fields
    //     $brandFilters = ['brand_name', 'brand_description'];
    
    //     if ($request->hasAny($brandFilters)) {
    //         $query->whereHas('variant.product.brand', function ($q) use ($request, $brandFilters) {
    //             foreach ($brandFilters as $field) {
    //                 if ($request->has($field)) {
    //                     $q->where($field, $request->input($field));
    //                 }
    //             }
    //         });
    //     }
    
    //     // Pagination setup
    //     $limit = $request->input('limit', 10);
    //     $offset = $request->input('offset', 0);
    
    //     $inventory = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));

    //     $inventory->getCollection()->transform(function ($product) {
    //         if ($product->variant->product->feature_imageUrl) {
    //             $product->variant->product->feature_imageUrl = url(Storage::url($product->variant->product->feature_imageUrl));
    //         }
    //         if ($product->variant->product->all_imageUrls) {
    //             $allImageUrls = json_decode($product->variant->product->all_imageUrls, true);
    //             $product->variant->product->all_imageUrls = array_map(function($imageUrl) {
    //                 return url(Storage::url($imageUrl));
    //             }, $allImageUrls);
    //         }
    //         return $product;
    //     });


    //     $total = $query->count();
    
    //     return response()->json([
    //         'total' => $total,
    //         'limit' => $limit,
    //         'offset' => $offset,
    //         'data' => $inventory
    //     ]);
    // }

    public function index(Request $request)
{
    $query = Inventory::with(['variant.product.category', 'supplier.user', 'variant.product.brand']);

    // Filtering for Inventory fields
    $inventoryFilters = [
        'imei', 'serial_no', 'barcode', 'condition',
        'discount_type', 'purchase_order_no', 'supplier_id', 
        'stock_status', 'date_purchased', 'date_sold', 'notes'
    ];

    foreach ($inventoryFilters as $field) {
        if ($request->has($field)) {
            $query->where($field, $request->input($field));
        }
    }

    // Handle price filters with min/max
    $priceFields = [
        'purchase_price',
        'selling_price',
        'discount_price',
        'wholesale_price'
    ];

    foreach ($priceFields as $field) {
        if ($request->has($field)) {
            $type = $request->input($field . '_type', 'min'); 
            
            if ($type === 'min') {
                $query->where($field, '>=', $request->input($field));
            } else {
                $query->where($field, '<=', $request->input($field));
            }
        }
    }

    // Filtering for ProductVariant fields
    $variantFilters = ['storage_gb', 'color', 'network_type'];

    if ($request->hasAny($variantFilters)) {
        $query->whereHas('variant', function ($q) use ($request, $variantFilters) {
            foreach ($variantFilters as $field) {
                if ($request->has($field)) {
                    $q->where($field, $request->input($field));
                }
            }
        });
    }

    // Filtering for Product fields
    $productFilters = ['model_name', 'product_description', 'sku', 'category'];

    if ($request->has('id')) {
        $query->where('id', $request->id);
    }

    if ($request->hasAny($productFilters)) {
        $query->whereHas('variant.product', function ($q) use ($request, $productFilters) {
            foreach ($productFilters as $field) {
                if ($request->has($field)) {
                    $q->where($field, $request->input($field));
                }
            }
        });
    }

    // Filtering for Brand fields
    $brandFilters = ['brand_name', 'brand_description'];

    if ($request->hasAny($brandFilters)) {
        $query->whereHas('variant.product.brand', function ($q) use ($request, $brandFilters) {
            foreach ($brandFilters as $field) {
                if ($request->has($field)) {
                    $q->where($field, $request->input($field));
                }
            }
        });
    }

    // Pagination setup
    $limit = $request->input('limit', 10);
    $offset = $request->input('offset', 0);

    $inventory = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));

    $inventory->getCollection()->transform(function ($product) {
        if ($product->variant->product->feature_imageUrl) {
            $product->variant->product->feature_imageUrl = url(Storage::url($product->variant->product->feature_imageUrl));
        }
        if ($product->variant->product->all_imageUrls) {
            $allImageUrls = json_decode($product->variant->product->all_imageUrls, true);
            $product->variant->product->all_imageUrls = array_map(function($imageUrl) {
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
        'data' => $inventory
    ]);
}
    

    /**
     * POST: Insert data into all tables from a single request
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Brand validation
            'brand_name' => 'required|string|max:50',
            'brand_description' => 'nullable|string',

            // Product validation
            'model_name' => 'required|string|max:100',
            'product_description' => 'nullable|string',
            'category' => 'nullable|string|max:50',
            'quantity' => 'nullable|integer|min:1',
            'sku' => 'nullable|string',

            // Product Variant validation
            'storage_gb' => 'nullable|integer',
            'color' => 'nullable|string|max:30',
            'network_type' => 'nullable|string|max:30',

            // Inventory validation
            'imei' => 'nullable|string|max:20|unique:inventory,imei',
            'serial_no' => 'nullable|string|max:50|unique:inventory,serial_no',
            'barcode' => 'nullable|string|max:50|unique:inventory,barcode',
            'condition' => 'required|in:Brand New,14 Days,Grade A,Grade B,Grade C,Grade D,Grade E',
            'purchase_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'discount_type' => 'nullable|in:fixed,percentage',
            'discount_price' => 'nullable|numeric',
            'wholesale_price' => 'nullable|numeric',
            'purchase_order_no' => 'nullable|string|max:30',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'stock_status' => 'nullable|in:In Stock,Sold,Returned,Defective',
            'date_purchased' => 'nullable|date',
            'date_sold' => 'nullable|date',
            'notes' => 'nullable|string',

            // File upload validation
            'feature_imageUrl' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'all_imageUrls.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Check if the brand already exists
        $brand = Brand::firstOrCreate(
            ['brand_name' => $request->brand_name],
            ['description' => $request->brand_description, 'is_active' => true]
        );

        // Create product
        $product = Product::create([
            'brand_id' => $brand->id, 
            'model_name' => $request->model_name,
            'description' => $request->product_description,
            'sku' => $request->sku,
            'category' => $request->category,
            'quantity' => $request->quantity ?? 1,
            'is_active' => false
        ]);

        // Upload feature image
        if ($request->hasFile('feature_imageUrl')) {
            $featureImagePath = $request->file('feature_imageUrl')->store('images/products', 'public');
            $product->feature_imageUrl = $featureImagePath;
        }

        // Upload multiple images
        $allImagesPaths = [];
        if ($request->hasFile('all_imageUrls')) {
            foreach ($request->file('all_imageUrls') as $image) {
                $allImagesPaths[] = $image->store('images/products', 'public');
            }
            $product->all_imageUrls = json_encode($allImagesPaths);
        }

        $product->save();

        // Create product variant
        $productVariant = ProductVariant::create([
            'product_id' => $product->id,
            'storage_gb' => $request->storage_gb,
            'color' => $request->color,
            'network_type' => $request->network_type,
            'is_active' => true
        ]);

        // Create inventory
        $inventory = Inventory::create([
            'variant_id' => $productVariant->id,
            'imei' => $request->imei,
            'serial_no' => $request->serial_no,
            'barcode' => $request->barcode,
            'condition' => $request->condition,
            'purchase_price' => $request->purchase_price,
            'selling_price' => $request->selling_price,
            'discount_type' => $request->discount_type,
            'discount_price' => $request->discount_price,
            'wholesale_price' => $request->wholesale_price,
            'purchase_order_no' => $request->purchase_order_no,
            'supplier_id' => $request->supplier_id,
            'stock_status' => $request->stock_status ?? 'In Stock',
            'date_purchased' => $request->date_purchased,
            'date_sold' => $request->date_sold,
            'notes' => $request->notes,
            'is_active' => true
        ]);

        return response()->json(['message' => 'Inventory created successfully', 'inventory' => $inventory]);
    }

    /**
     * PUT: Update inventory
     */
    public function update(Request $request, Inventory $inventory)
    {
        $validator = Validator::make($request->all(), [
            // Brand validation
            'brand_name' => 'sometimes|required|string|max:50|unique:brands,brand_name,' . $inventory->variant->product->brand->id,
            'brand_description' => 'sometimes|string',
    
            // Product validation
            'model_name' => 'sometimes|required|string|max:100',
            'product_description' => 'sometimes|string',
            'category' => 'sometimes|string|max:50',
            'quantity' => 'sometimes|integer',
            'sku' => 'sometimes|string',
    
            // Product Variant validation
            'storage_gb' => 'sometimes|integer',
            'color' => 'sometimes|string|max:30',
            'network_type' => 'sometimes|string|max:30',
            'is_active' => 'sometimes|boolean',
    
            // Inventory validation
            'imei' => 'sometimes|string|max:20|unique:inventory,imei,' . $inventory->id,
            'serial_no' => 'sometimes|string|max:50|unique:inventory,serial_no,' . $inventory->id,
            'barcode' => 'sometimes|string|max:50|unique:inventory,barcode,' . $inventory->id,
            'condition' => 'sometimes|in:Brand New,14 Days,Grade A,Grade B,Grade C,Grade D,Grade E',
            'purchase_price' => 'sometimes|numeric',
            'selling_price' => 'sometimes|numeric',
            'discount_type' => 'sometimes|in:fixed,percentage',
            'discount_price' => 'sometimes|numeric',
            'wholesale_price' => 'sometimes|numeric',
            'purchase_order_no' => 'sometimes|string|max:30',
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'stock_status' => 'sometimes|in:In Stock,Sold,Returned,Defective',
            'date_purchased' => 'sometimes|date',
            'date_sold' => 'sometimes|date',
            'notes' => 'sometimes|string',
    
            // File upload validation
            'feature_imageUrl' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'all_imageUrls.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Get related models
        $productVariant = $inventory->variant;
        $product = $productVariant->product;
        $brand = $product->brand;
    
        // Update Brand
        if ($request->has('brand_name')) {
            $brand->brand_name = $request->brand_name;
        }
        if ($request->has('brand_description')) {
            $brand->brand_description = $request->brand_description;
        }
        $brand->save();
    
        // Update Product
        if ($request->has('model_name')) {
            $product->model_name = $request->model_name;
        }
        if ($request->has('product_description')) {
            $product->description = $request->product_description;
        }
        if ($request->has('sku')) {
            $product->sku = $request->sku;
        }
        if ($request->has('category')) {
            $product->category = $request->category;
        }
        if ($request->has('quantity')) {
            $product->quantity = $request->quantity;
        }
        if ($request->has('is_active')) {
            $product->is_active = $request->is_active;
        }
    
        // Handle feature image update
        if ($request->hasFile('feature_imageUrl')) {
            // Delete old image
            if ($product->feature_imageUrl) {
                Storage::disk('public')->delete($product->feature_imageUrl);
            }
            $product->feature_imageUrl = $request->file('feature_imageUrl')->store('images/products', 'public');
        }
    
        // Handle multiple image update
        if ($request->hasFile('all_imageUrls')) {
            $allImagesPaths = [];
            foreach ($request->file('all_imageUrls') as $image) {
                $allImagesPaths[] = $image->store('images/products', 'public');
            }
            $product->all_imageUrls = json_encode($allImagesPaths);
        }
    
        $product->save();
    
        // Update Product Variant
        if ($request->has('storage_gb')) {
            $productVariant->storage_gb = $request->storage_gb;
        }
        if ($request->has('color')) {
            $productVariant->color = $request->color;
        }
        if ($request->has('network_type')) {
            $productVariant->network_type = $request->network_type;
        }
        $productVariant->save();
    
        // Update Inventory
        $inventory->update($request->only([
            'imei', 'serial_no', 'barcode', 'condition', 'purchase_price',
            'selling_price', 'discount_type', 'discount_price', 'wholesale_price',
            'purchase_order_no', 'supplier_id', 'stock_status', 'date_purchased',
            'date_sold', 'notes'
        ]));
    
        return response()->json(['message' => 'Inventory updated successfully', 'inventory' => $inventory]);
    }
    

    /**
     * DELETE: Remove inventory
     */
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return response()->json(['message' => 'Inventory deleted successfully']);
    }
}
