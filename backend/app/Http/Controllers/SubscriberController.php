<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SubscriberController extends Controller
{
    /**
     * Display a filtered listing of subscribers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Subscriber::query();

        // Filter by email
        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        // Filter by first_name
        if ($request->has('first_name')) {
            $query->where('first_name', 'like', '%' . $request->first_name . '%');
        }

        // Filter by last_name
        if ($request->has('last_name')) {
            $query->where('last_name', 'like', '%' . $request->last_name . '%');
        }

        // Filter by subscription_date
        if ($request->has('subscription_date')) {
            $query->whereDate('subscription_date', $request->subscription_date);
        }

        if ($request->has('unsubscribe_token')) {
            $query->where('unsubscribe_token', 'like', '%' . $request->unsubscribe_token . '%');
        }

        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        // Filter by last_contacted
        if ($request->has('last_contacted')) {
            $query->whereDate('last_contacted', $request->last_contacted);
        }


        // Apply limit and offset for pagination
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $subscribers = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));

        $total = $query->count();

        return response()->json([
            'data' => $subscribers,
            'limit' => (int)$limit,
            'offset' => (int)$offset,
            'count' => $subscribers->count(),
            'total' => $query->count(),
        ]);
    }

    /**
     * Store a newly created subscriber in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100|unique:subscribers',
            'first_name' => 'nullable|string|max:50',
            'last_name' => 'nullable|string|max:50',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validated = $validator->validated();
        $validated['unsubscribe_token'] = Str::random(60);

        $subscriber = Subscriber::create($validated);

        return response()->json($subscriber, 201);
    }

    /**
     * Display the specified subscriber.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subscriber = Subscriber::find($id);

        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        return response()->json($subscriber);
    }

    /**
     * Update the specified subscriber in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $subscriber = Subscriber::find($id);

        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'string|email|max:100|unique:subscribers,email,' . $id,
            'first_name' => 'nullable|string|max:50',
            'last_name' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'last_contacted' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $subscriber->update($validator->validated());

        return response()->json($subscriber);
    }

    /**
     * Remove the specified subscriber from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subscriber = Subscriber::find($id);

        if (!$subscriber) {
            return response()->json(['message' => 'Subscriber not found'], 404);
        }

        $subscriber->delete();

        return response()->json(['message' => 'Subscriber deleted successfully']);
    }
}