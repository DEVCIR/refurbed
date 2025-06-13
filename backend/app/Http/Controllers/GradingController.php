<?php

namespace App\Http\Controllers;

use App\Models\Grading;
use Illuminate\Http\Request;

class GradingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gradings = Grading::with('product')->get();
        return response()->json($gradings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_condition' => 'required|json',
        ]);

        $grading = Grading::create($validated);
        return response()->json($grading, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $grading = Grading::with('product')->find($id);
        
        if (!$grading) {
            return response()->json(['message' => 'Grading not found'], 404);
        }
        
        return response()->json($grading);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $grading = Grading::find($id);
        
        if (!$grading) {
            return response()->json(['message' => 'Grading not found'], 404);
        }

        $validated = $request->validate([
            'product_id' => 'sometimes|required|exists:products,id',
            'product_condition' => 'sometimes|required|json',
        ]);

        $grading->update($validated);
        return response()->json($grading);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $grading = Grading::find($id);
        
        if (!$grading) {
            return response()->json(['message' => 'Grading not found'], 404);
        }

        $grading->delete();
        return response()->json(['message' => 'Grading deleted successfully']);
    }
}