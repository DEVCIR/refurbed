<?php

namespace App\Http\Controllers;

use App\Models\CampaignRecipient;
use Illuminate\Http\Request;

class CampaignRecipientController extends Controller
{
    /**
     * Display a paginated listing of campaign recipients with filtering.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = CampaignRecipient::with('campaign', 'subscriber');

        // Filter by campaign_id
        if ($request->has('campaign_id')) {
            $query->where('campaign_id', $request->campaign_id);
        }

        // Filter by subscriber_id
        if ($request->has('subscriber_id')) {
            $query->where('subscriber_id', $request->subscriber_id);
        }

        // Filter by email_address
        if ($request->has('email_address')) {
            $query->where('email_address', 'like', '%' . $request->email_address . '%');
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by sent_time
        if ($request->has('sent_time')) {
            $query->whereDate('sent_time', $request->sent_time);
        }

        // Filter by open_time
        if ($request->has('open_time')) {
            $query->whereDate('open_time', $request->open_time);
        }

        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }


        // Pagination with limit and offset
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $recipients = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'data' => $recipients,
            'meta' => [
                'limit' => (int)$limit,
                'offset' => (int)$offset,
                'total' => $query->count(),
            ]
        ]);
    }

    /**
     * Store a newly created campaign recipient in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'campaign_id' => 'required|exists:email_campaigns,id',
            'subscriber_id' => 'nullable|exists:subscribers,id',
            'email_address' => 'required|email|max:100',
            'status' => 'nullable|in:Pending,Sent,Failed,Opened,Clicked',
            'sent_time' => 'nullable|date',
            'open_time' => 'nullable|date',
            'is_active' => 'nullable|boolean',
        ]);

        $recipient = CampaignRecipient::create($validated);

        return response()->json($recipient, 201);
    }

    /**
     * Display the specified campaign recipient.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $recipient = CampaignRecipient::findOrFail($id);
        return response()->json($recipient);
    }

    /**
     * Update the specified campaign recipient in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $recipient = CampaignRecipient::findOrFail($id);

        $validated = $request->validate([
            'campaign_id' => 'sometimes|required|exists:email_campaigns,id',
            'subscriber_id' => 'nullable|exists:subscribers,id',
            'email_address' => 'sometimes|required|email|max:100',
            'status' => 'nullable|in:Pending,Sent,Failed,Opened,Clicked',
            'sent_time' => 'nullable|date',
            'open_time' => 'nullable|date',
            'is_active' => 'nullable|boolean',
        ]);

        $recipient->update($validated);

        return response()->json($recipient);
    }

    /**
     * Remove the specified campaign recipient from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $recipient = CampaignRecipient::findOrFail($id);
        $recipient->delete();

        return response()->json(null, 204);
    }
}