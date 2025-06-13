<?php

namespace App\Http\Controllers;

use App\Models\ReportTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReportTemplateController extends Controller
{
    // Get all templates with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = ReportTemplate::query();

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('template_name')) {
            $query->where('template_name', 'LIKE', "%{$request->template_name}%");
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $templates =$query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();   

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $templates
        ]);
    }

    // Store a new template with file upload
    public function store(Request $request)
    {
        $request->validate([
            'template_name' => 'required|string|max:50|unique:report_templates',
            'description' => 'nullable|string',
            'template_file' => 'required|mimes:pdf,doc,docx', 
            'is_active' => 'boolean'
        ]);

        // Store file in storage/app/public/templates/
        if ($request->hasFile('template_file')) {
            $filePath = $request->file('template_file')->store('templates', 'public');
        }

        $template = ReportTemplate::create([
            'template_name' => $request->template_name,
            'description' => $request->description,
            'template_file_path' => $filePath ?? null,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json($template, 201);
    }

    // Update an existing template
    // public function update(Request $request, ReportTemplate $template)
    // {
    //     $request->validate([
    //         'template_name' => 'sometimes|string|max:50|unique:report_templates,template_name,' . $template->id,
    //         'description' => 'sometimes|string',
    //         'template_file' => 'sometimes|mimes:pdf,doc,docx', 
    //         'is_active' => 'sometimes|boolean'
    //     ]);

    //     // If new file is uploaded, delete the old one and store the new one
    //     if ($request->hasFile('template_file')) {
    //         // Delete old file if exists
    //         if ($template->template_file_path) {
    //             Storage::disk('public')->delete($template->template_file_path);
    //         }
    //         // Store new file
    //         $filePath = $request->file('template_file')->store('templates', 'public');
    //         $template->template_file_path = $filePath;
    //     }

    //     $template->update($request->except('template_file'));

    //     return response()->json($template);
    // }

    public function update(Request $request, ReportTemplate $template)
{
    try {
        $request->validate([
            'template_name' => 'sometimes|string|max:50|unique:report_templates,template_name,' . $template->id,
            'description' => 'sometimes|string',
            'template_file' => 'sometimes|mimes:pdf,doc,docx', 
            'is_active' => 'sometimes|boolean'
        ]);

        // If new file is uploaded, delete the old one and store the new one
        if ($request->hasFile('template_file')) {
            // Delete old file if exists
            if ($template->template_file_path) {
                Storage::disk('public')->delete($template->template_file_path);
            }
            // Store new file
            $filePath = $request->file('template_file')->store('templates', 'public');
            $template->template_file_path = $filePath;
        }

        $template->update($request->except('template_file'));

        return response()->json($template);
        
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error updating template',
            'error' => $e->getMessage()
        ], 500);
    }
}

    // Delete a template
    public function destroy(ReportTemplate $template)
    {
        // Delete file from storage
        if ($template->template_file_path) {
            Storage::disk('public')->delete($template->template_file_path);
        }

        $template->delete();

        return response()->json(['message' => 'Report template deleted successfully']);
    }
}
