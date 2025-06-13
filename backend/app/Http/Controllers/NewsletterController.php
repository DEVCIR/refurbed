<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    public function index()
    {
        $subscribers = Newsletter::all();
        return response()->json($subscribers);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletters',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $subscriber = Newsletter::create([
            'email' => $request->email,
            'name' => $request->name,
            'subscribed_at' => now(),
        ]);

        return response()->json($subscriber, 201);
    }

    public function show($id)
    {
        $subscriber = Newsletter::find($id);
        
        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        return response()->json($subscriber);
    }

    public function update(Request $request, $id)
    {
        $subscriber = Newsletter::find($id);
        
        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'sometimes|email|unique:newsletters,email,'.$id,
            'name' => 'sometimes|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $subscriber->update($request->all());

        return response()->json($subscriber);
    }

    public function destroy($id)
    {
        $subscriber = Newsletter::find($id);
        
        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        $subscriber->delete();

        return response()->json(['message' => 'Subscriber deleted successfully']);
    }


    public function emails()
{
    $emails = Newsletter::pluck('email');
    return response()->json($emails);
}


public function emailCount()
{
    $count = Newsletter::count();
    
    return response()->json([
        'status' => 'success',
        'count' => $count,
        'message' => 'Total number of emails retrieved successfully.'
]);
}

}