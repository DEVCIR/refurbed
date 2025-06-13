<?php

namespace App\Http\Controllers;

use App\Models\GeneratedReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GeneratedReportController extends Controller
{
    // Get all reports with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = GeneratedReport::with('template', 'generatedBy');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('report_name')) {
            $query->where('report_name', 'LIKE', "%{$request->report_name}%");
        }
        if ($request->has('generated_by')) {
            $query->where('generated_by', $request->generated_by);
        }
        if ($request->has('template_id')) {
            $query->where('template_id', $request->template_id);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $reports = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();   

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $reports
        ]);
    }

    // Store a new generated report with file upload
    public function store(Request $request)
    {
        $request->validate([
            'template_id' => 'nullable|exists:report_templates,id',
            'report_name' => 'required|string|max:100',
            'generated_by' => 'required|exists:users,id',
            'parameters' => 'nullable|string',
            'file' => 'nullable|mimes:pdf,doc,docx|max:2048',
            'is_active' => 'boolean'
        ]);

        // Store file in storage/app/public/reports/
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('reports', 'public');
        }

        $report = GeneratedReport::create([
            'template_id' => $request->template_id,
            'report_name' => $request->report_name,
            'generated_by' => $request->generated_by,
            'parameters' => $request->parameters,
            'file_path' => $filePath ?? null,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json($report, 201);
    }

    // Update an existing generated report
    public function update(Request $request, GeneratedReport $report)
    {
        $request->validate([
            'template_id' => 'sometimes|exists:report_templates,id',
            'report_name' => 'sometimes|string|max:100',
            'parameters' => 'sometimes|string',
            'file' => 'sometimes|mimes:pdf,doc,docx',
            'is_active' => 'sometimes|boolean'
        ]);

        // If new file is uploaded, delete the old one and store the new one
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($report->file_path) {
                Storage::disk('public')->delete($report->file_path);
            }
            // Store new file
            $filePath = $request->file('file')->store('reports', 'public');
            $report->file_path = $filePath;
        }

        $report->update($request->except('file'));

        return response()->json($report);
    }

    // Delete a generated report
    public function destroy(GeneratedReport $report)
    {
        // Delete file from storage
        if ($report->file_path) {
            Storage::disk('public')->delete($report->file_path);
        }

        $report->delete();

        return response()->json(['message' => 'Generated report deleted successfully']);
    }
}
