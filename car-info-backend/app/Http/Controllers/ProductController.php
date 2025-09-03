<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * GET ALL PRODUCTS WITH OPTIONAL FILTER
     */
    public function index(Request $request)
    {
        $query = Product::query();

        if($request->has('type')) {
            $query->where('product_type', $request->type);
        }

        if ($request->has('name')) {
            $query->where('product_name', 'like', '%' . $request->name . '%');
        }

        return response()->json($query->get());
    }

    /**
     * CREATE A NEW PRODUCT
     */
    public function store(Request $request)
    {
    $validated = $request->validate([
        'product_name' => 'required|string|max:255',
        'product_type' => 'required|string|max:255',
    ]);

    $product = Product::create($validated);

    return response()->json($product, 201);
    }

    /**
     * SHOW PRODUCT BY ITS ID
     */
    public function show(string $id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    /**
     * UPDATE THE PRODUCT
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validation = $request->validate([
            'product_name' => 'sometimes|string|max:255',
            'product_type' => 'sometimes|string|max:255',
        ]);

        $product->update($validation);

        return response()->json($product);
    }

    /**
     * DELETE PRODUCT
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

         return response()->json(['message' => 'Product deleted successfully']);
    }
}
