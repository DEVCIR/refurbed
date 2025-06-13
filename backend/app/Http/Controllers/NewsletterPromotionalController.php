<?php

namespace App\Http\Controllers;

use App\Models\NewsletterPromotional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterPromotionalController extends Controller
{
    public function index()
    {
        $newsletters = NewsletterPromotional::all();
        return response()->json($newsletters);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject_line' => 'required|string|max:255',
            'content' => 'required|string',
            'recipients' => 'required|array',
            'recipients.*' => 'email',
            'schedule_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $newsletter = NewsletterPromotional::create([
            'subject_line' => $request->subject_line,
            'content' => $request->content,
            'recipients' => json_encode($request->recipients),
            'schedule_date' => $request->schedule_date,
        ]);

        return response()->json($newsletter, 201);
    }

    public function show($id)
    {
        $newsletter = NewsletterPromotional::find($id);
        
        if (!$newsletter) {
            return response()->json(['message' => 'Newsletter not found'], 404);
        }

        return response()->json($newsletter);
    }

    public function update(Request $request, $id)
    {
        $newsletter = NewsletterPromotional::find($id);
        
        if (!$newsletter) {
            return response()->json(['message' => 'Newsletter not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'subject_line' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'recipients' => 'sometimes|array',
            'recipients.*' => 'email',
            'schedule_date' => 'nullable|date',
            'sending_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $newsletter->update($request->all());

        return response()->json($newsletter);
    }

    public function destroy($id)
    {
        $newsletter = NewsletterPromotional::find($id);
        
        if (!$newsletter) {
            return response()->json(['message' => 'Newsletter not found'], 404);
        }

        $newsletter->delete();

        return response()->json(['message' => 'Newsletter deleted successfully']);
    }

    public function promotionalEmail()
    {
        $count = NewsletterPromotional::count();
        
        return response()->json([
            'status' => 'success',
            'count' => $count,
            'message' => 'Total number of promotional emails retrieved successfully.'
 ]);
    }
}