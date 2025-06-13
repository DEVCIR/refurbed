<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function index(Request $request)
    {
        $query = Voucher::with('creator');
        
        if ($request->has('voucher_code')) {
            $query->where('voucher_code', 'like', '%' . $request->voucher_code . '%');
        }
        
        return $query->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'voucher_code' => 'required|string|max:255',
            'voucher_secret_id' => 'required|numeric|unique:vouchers',
            'discount_type' => 'required|in:fixed,percentage',
            'voucher_discount' => 'required|string',
            'voucher_creator' => 'required|exists:users,id'
        ]);

        return Voucher::create($request->all());
    }

    public function show($id)
    {
        return Voucher::with('creator')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $voucher = Voucher::findOrFail($id);
        
        $request->validate([
            'voucher_code' => 'sometimes|string|max:255',
            'voucher_secret_id' => 'sometimes|numeric|unique:vouchers,voucher_secret_id,'.$id,
            'discount_type' => 'sometimes|in:fixed,percentage',
            'voucher_discount' => 'sometimes|string',
            'voucher_creator' => 'sometimes|exists:users,id'
        ]);

        $voucher->update($request->all());
        return $voucher;
    }

    public function destroy($id)
    {
        Voucher::findOrFail($id)->delete();
        return response()->json(['message' => 'Voucher deleted successfully']);
    }

    public function getByVoucherSecretId($voucher_secret_id)
    {
        $voucher = Voucher::with('creator')
                        ->where('voucher_secret_id', $voucher_secret_id)
                        ->first();

        if (!$voucher) {
            return response()->json(['message' => 'Voucher not found'], 404);
        }

        return $voucher;
    }
}