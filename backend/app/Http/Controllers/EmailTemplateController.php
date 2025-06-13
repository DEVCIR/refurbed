<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailTemplateController extends Controller
{
    /**
     * Display a listing of the resource with filtering and pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
{
    // Start with all templates
    $query = EmailTemplate::query();

    // Apply filters if provided
    if ($request->has('template_name')) {
        $query->where('template_name', 'like', '%' . $request->template_name . '%');
    }

    if ($request->has('subject')) {
        $query->where('subject', 'like', '%' . $request->subject . '%');
    }

    if ($request->has('content')) {
        $query->where('content', 'like', '%' . $request->content . '%');
    }

    if ($request->has('is_active')) {
        $query->where('is_active', $request->is_active);
    }

    // Get limit and offset from request (with defaults)
    $limit = $request->input('limit', 10);
    $offset = $request->input('offset', 0);

    // Get total count before pagination
    $total = $query->count();

    // Execute query with pagination
    $templates = $query->skip($offset)->take($limit)->get();

    return response()->json([
        'success' => true,
        'data' => $templates,
        'meta' => [
            'limit' => (int)$limit,
            'offset' => (int)$offset,
            'total' => $total
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
            'template_name' => 'required|string|max:50|unique:email_templates,template_name',
            'subject' => 'required|string|max:200',
            'content' => 'required|string',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $template = EmailTemplate::create($request->only([
            'template_name',
            'subject',
            'content',
            'is_active'
        ]));

        return response()->json([
            'success' => true,
            'data' => $template
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $template = EmailTemplate::find($id);

        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Email template not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $template
        ]);
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
        $template = EmailTemplate::find($id);

        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Email template not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'template_name' => 'sometimes|string|max:50|unique:email_templates,template_name,' . $id,
            'subject' => 'sometimes|string|max:200',
            'content' => 'sometimes|string',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $template->update($request->only([
            'template_name',
            'subject',
            'content',
            'is_active'
        ]));

        return response()->json([
            'success' => true,
            'data' => $template
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $template = EmailTemplate::find($id);

        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Email template not found'
            ], 404);
        }

        $template->delete();

        return response()->json([
            'success' => true,
            'message' => 'Email template deleted successfully'
        ]);
    }
}