<?php

namespace App\Http\Controllers;

use App\Models\EmailCampaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailCampaignController extends Controller
{
    /**
     * Display a listing of the resource with filtering and pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Build query based on request parameters
        $query = EmailCampaign::with('template', 'createdBy');
        
        // Filter by template_id
        if ($request->has('template_id')) {
            $query->where('template_id', $request->template_id);
        }
        
        // Filter by campaign_name
        if ($request->has('campaign_name')) {
            $query->where('campaign_name', 'like', '%' . $request->campaign_name . '%');
        }
        
        // Filter by subject
        if ($request->has('subject')) {
            $query->where('subject', 'like', '%' . $request->subject . '%');
        }
        
        // Filter by content (if needed)
        if ($request->has('content')) {
            $query->where('content', 'like', '%' . $request->content . '%');
        }
        
        // Filter by scheduled_time range
        if ($request->has('scheduled_time_from')) {
            $query->where('scheduled_time', '>=', $request->scheduled_time_from);
        }
        if ($request->has('scheduled_time_to')) {
            $query->where('scheduled_time', '<=', $request->scheduled_time_to);
        }
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by sent_count range
        if ($request->has('sent_count_min')) {
            $query->where('sent_count', '>=', $request->sent_count_min);
        }
        if ($request->has('sent_count_max')) {
            $query->where('sent_count', '<=', $request->sent_count_max);
        }
        
        // Filter by open_count range
        if ($request->has('open_count_min')) {
            $query->where('open_count', '>=', $request->open_count_min);
        }
        if ($request->has('open_count_max')) {
            $query->where('open_count', '<=', $request->open_count_max);
        }
        
        // Filter by click_count range
        if ($request->has('click_count_min')) {
            $query->where('click_count', '>=', $request->click_count_min);
        }
        if ($request->has('click_count_max')) {
            $query->where('click_count', '<=', $request->click_count_max);
        }
        
        // Filter by created_by
        if ($request->has('created_by')) {
            $query->where('created_by', $request->created_by);
        }
        
        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }
        
        
        // Handle pagination with limit and offset
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $campaigns = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        
        // Get paginated results
        
        // Return response with pagination info
        return response()->json([
            'data' => $campaigns,
            'pagination' => [
                'total' => $query->count(),
                'limit' => (int)$limit,
                'offset' => (int)$offset,
                'has_more' => ($offset + $limit) < $query->count(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'template_id' => 'nullable|exists:email_templates,id',
            'campaign_name' => 'required|string|max:100',
            'subject' => 'required|string|max:200',
            'content' => 'required|string',
            'scheduled_time' => 'nullable|date',
            'status' => 'required|in:Draft,Scheduled,Sent,Cancelled',
            'created_by' => 'required|exists:users,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign = EmailCampaign::create($request->all());

        return response()->json($campaign, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $campaign = EmailCampaign::find($id);

        if (!$campaign) {
            return response()->json(['message' => 'Email campaign not found'], 404);
        }

        return response()->json($campaign);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $campaign = EmailCampaign::find($id);

        if (!$campaign) {
            return response()->json(['message' => 'Email campaign not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'template_id' => 'nullable|exists:email_templates,id',
            'campaign_name' => 'sometimes|string|max:100',
            'subject' => 'sometimes|string|max:200',
            'content' => 'sometimes|string',
            'scheduled_time' => 'nullable|date',
            'status' => 'sometimes|in:Draft,Scheduled,Sent,Cancelled',
            'sent_count' => 'sometimes|integer',
            'open_count' => 'sometimes|integer',
            'click_count' => 'sometimes|integer',
            'created_by' => 'sometimes|exists:users,id',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign->update($request->all());

        return response()->json($campaign);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $campaign = EmailCampaign::find($id);

        if (!$campaign) {
            return response()->json(['message' => 'Email campaign not found'], 404);
        }

        $campaign->delete();

        return response()->json(['message' => 'Email campaign deleted successfully']);
    }
}