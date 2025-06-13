<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ConferenceMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\Invoice;
use App\Models\CreditNote;


class EmailController extends Controller
{

    public function sendLoginMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|string',
            'email' => 'required|email',
            'name' => 'required|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input data'], 400);
        }
    
        $emailContent = "
            <div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
                <h2 style='color: #2c3e50;'>🎉 Thank You for Subscribing to Our eCommerce Newsletter!</h2>
                <p>Hi {$request->name},</p>
                <p>You’ve successfully subscribed as a <strong><i>{$request->role}</i></strong> using the email address: 
                    <strong><i>{$request->email}</i></strong>.</p>
                
                <p>We're excited to have you with us! Here's what you can look forward to:</p>
                <ul>
                    <li>🛒 Exclusive offers and deals</li>
                    <li>🆕 Updates on the latest products</li>
                    <li>📦 Shopping tips and trends from our experts</li>
                </ul>
    
                <p style='margin-top: 20px;'>Stay connected, and keep an eye on your inbox — there’s more great stuff coming your way!</p>
                
                <hr style='margin: 20px 0;'>
                
                <p style='font-size: 14px; color: #777;'>If this wasn’t you or you didn’t subscribe, please contact our support at 
                <strong><i>demo@gmail.com</i></strong>.</p>
    
                <p style='font-size: 13px; color: #aaa;'>© " . date('Y') . " eCommerce Site. All rights reserved.</p>
            </div>
        ";
    
        Mail::html($emailContent, function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('🎉 Welcome to Our eCommerce Newsletter!');
        });
    
        return response()->json(['message' => 'Newsletter confirmation email sent successfully.']);
    }

    public function sendInvoiceEmail(Request $request, $invoiceId)
    {
        // Validate the request
        $validator = Validator::make(['invoice_id' => $invoiceId], [
            'invoice_id' => 'required|exists:invoices,id'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid invoice ID'], 400);
        }
    
        // Fetch the invoice with related data
        $invoice = Invoice::with(['customer.user', 'order'])
            ->findOrFail($invoiceId);
        
        // Prepare email content with premium styling
        $emailContent = "
            <div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>
                <!-- Header -->
                <div style='background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); padding: 30px; color: white; text-align: center;'>
                    <h1 style='margin: 0; font-size: 32px; font-weight: 600; letter-spacing: 1px;'>INVOICE</h1>
                    <p style='margin: 8px 0 0; font-size: 16px; opacity: 0.9;'>DEVCIR CO</p>
                </div>
    
                <!-- Main Content -->
                <div style='padding: 35px; background-color: #ffffff;'>
                    <!-- From & Invoice Details -->
                    <div style='display: flex; justify-content: space-between; margin-bottom: 40px;'>
                        <div style='flex: 1; padding-right: 20px;'>
                            <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #3498db; font-size: 18px;'>From</h3>
                            <div style='background-color: #f8fafc; padding: 15px; border-radius: 6px;'>
                                <p style='margin: 0 0 8px 0; font-size: 16px;'><strong>DEVCIR CO</strong></p>
                                <p style='margin: 0 0 8px 0; color: #555;'>Email: billing@devcir.co</p>
                            </div>
                        </div>
                        
                        <div style='flex: 1; padding-left: 20px;'>
                            <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #3498db; font-size: 18px; text-align: right;'>Invoice Details</h3>
                            <div style='background-color: #f8fafc; padding: 15px; border-radius: 6px; text-align: right;'>
                                <p style='margin: 0 0 8px 0;'><strong>Invoice #:</strong> <span style='color: #3498db;'>{$invoice->invoice_number}</span></p>
                                <p style='margin: 0 0 8px 0;'><strong>Order #:</strong> <span style='color: #3498db;'>{$invoice->order->order_number}</span></p>
                                <p style='margin: 0 0 8px 0;'><strong>Date:</strong> {$invoice->invoice_date->format('F j, Y')}</p>
                                <p style='margin: 0 0 8px 0;'><strong>Due Date:</strong> <span style='color: #e74c3c; font-weight: 600;'>{$invoice->due_date->format('F j, Y')}</span></p>
                            </div>
                        </div>
                    </div>
    
                    <!-- Bill To & Shipping Address -->
                    <div style='display: flex; justify-content: space-between; margin-bottom: 40px;'>
                        <div style='flex: 1; padding-right: 20px;'>
                            <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #3498db; font-size: 18px;'>Bill To</h3>
                            <div style='background-color: #f8fafc; padding: 15px; border-radius: 6px;'>
                                <p style='margin: 0 0 8px 0; font-size: 16px;'><strong>{$invoice->customer->user->name}</strong></p>
                                <p style='margin: 0 0 8px 0; color: #555;'>{$invoice->customer->user->email}</p>
                                <p style='margin: 0 0 8px 0;'>{$invoice->customer->address}</p>
                                <p style='margin: 0 0 8px 0;'>{$invoice->customer->city}, {$invoice->customer->country}</p>
                                <p style='margin: 0;'>Postal Code: {$invoice->customer->postal_code}</p>
                            </div>
                        </div>
                        
                        <div style='flex: 1; padding-left: 20px;'>
                            <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #3498db; font-size: 18px; text-align: right;'>Shipping Address</h3>
                            <div style='background-color: #f8fafc; padding: 15px; border-radius: 6px; text-align: right;'>
                                <p style='margin: 0;'>{$invoice->order->shipping_address}</p>
                            </div>
                        </div>
                    </div>";
    
        // Add notes if they exist
        if ($invoice->notes) {
            $emailContent .= "
                    <!-- Notes Section -->
                    <div style='margin-bottom: 30px;'>
                        <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #3498db; font-size: 18px;'>Notes</h3>
                        <div style='background-color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #3498db;'>
                            <p style='margin: 0; color: #555; line-height: 1.7;'>{$invoice->notes}</p>
                        </div>
                    </div>";
        }
    
        // Closing content
        $emailContent .= "
                    <!-- Footer -->
                    <div style='margin-top: 40px; padding-top: 25px; border-top: 1px solid #e0e0e0; text-align: center; color: #777;'>
                        <p style='margin: 0 0 10px 0; font-size: 15px;'>Thank you for your business!</p>
                        <p style='margin: 0 0 15px 0; font-size: 14px;'>Please make payment by the due date to avoid late fees.</p>
                        <p style='margin: 0; font-size: 13px; color: #999;'>© ".date('Y')." Devcir. All rights reserved.</p>
                    </div>
                </div>
            </div>
        ";
    
        // Get recipient email from request or use customer email
        $recipientEmail = $request->input('email', $invoice->customer->user->email);
    
        // Send email
        Mail::html($emailContent, function ($message) use ($invoice, $recipientEmail) {
            $message->to($recipientEmail)
                    ->subject('Invoice #' . $invoice->invoice_number . ' | Order #' . $invoice->order->order_number . ' | Due ' . $invoice->due_date->format('M j'));
        });
    
        return response()->json(['message' => 'Invoice email sent successfully']);
    }


    public function sendPromotionalEmail(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'subject' => 'required|string',
        'content' => 'required|string'
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => 'Invalid input data'], 400);
    }

    $emailContent = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #ffffff; color: #333; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
            <h2 style='color: #e74c3c; margin-bottom: 16px;'>🔥 Exclusive Promotion Just for You!</h2>

            <p style='margin: 0 0 20px;'>We’re excited to bring you this special offer from <strong>XYZ eCommerce</strong> — your go-to store for amazing deals and top-notch products.</p>

            <p>{$request->content}</p>

            <p style='margin: 0 0 10px;'>Here’s what’s trending this week:</p>
            <ul style='padding-left: 20px;'>
                <li>📱 New arrivals in phones</li>
                <li>📱 Gadgets under budget with top reviews</li>
            </ul>

            <p style='margin-top: 20px;'>We appreciate having you as part of our community. Stay tuned for more exciting updates and offers!</p>

            <hr style='margin: 30px 0; border: none; border-top: 1px solid #ddd;'>

            <p style='font-size: 13px; color: #888; text-align: center;'>This is an auto-generated promotional email from XYZ eCommerce.<br>
            Please do not reply to this message. If you have any questions, contact us at <a href='mailto:support@xyzecommerce.com'>support@xyzecommerce.com</a>.</p>

            <p style='font-size: 12px; color: #aaa; text-align: center;'>© " . date('Y') . " XYZ eCommerce. All rights reserved.</p>
        </div>
    ";

    Mail::html($emailContent, function ($message) use ($request) {
        $message->to($request->email)
                ->subject($request->subject);
    });

    return response()->json(['message' => 'Promotional email sent successfully.']);
}


public function sendCreditNoteEmail(Request $request, $creditNoteId)
{
    // Validate the request
    $validator = Validator::make(['credit_note_id' => $creditNoteId], [
        'credit_note_id' => 'required|exists:credit_notes,id'
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => 'Invalid credit note ID'], 400);
    }

    // Fetch the credit note with related data
    $creditNote = CreditNote::with(['customer.user', 'rma', 'createdBy', 'items'])
        ->findOrFail($creditNoteId);
    
    // Company logo URL - Replace with your actual logo URL
    $logoUrl = asset('images/company-logo.png');
    
    // Prepare email content with enhanced styling
    $emailContent = "
        <div style='font-family: \"Segoe UI\", Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.08);'>
            <!-- Header -->
            <div style='background: linear-gradient(135deg, #1e88e5 0%, #42a5f5 100%); padding: 30px; color: white; text-align: center;'>
                <h1 style='margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 1px;'>CREDIT NOTE</h1>
                <p style='margin: 10px 0 0; font-size: 16px; opacity: 0.9;'>DEVCIR CO</p>
            </div>

            <!-- Main Content -->
            <div style='padding: 35px; background-color: #ffffff;'>
                <!-- Status Banner -->
                <div style='margin-bottom: 30px; padding: 12px 20px; background-color: #f0f7ff; border-radius: 8px; text-align: center; border-left: 4px solid #1e88e5;'>
                    <p style='margin: 0; font-size: 16px;'>
                        <span style='font-weight: 600; color: #1e88e5;'>Status: {$creditNote->status}</span>
                    </p>
                </div>
            
                <!-- Grid Container -->
                <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;'>
                    <!-- From Section -->
                    <div>
                        <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #1e88e5; font-size: 16px;'>FROM</h3>
                        <div style='background-color: #f8fafc; padding: 16px; border-radius: 8px;'>
                            <p style='margin: 0 0 8px 0; font-size: 16px; font-weight: 600;'>DEVCIR CO</p>
                            <p style='margin: 0; color: #555;'>Email: billing@devcir.co</p>
                        </div>
                    </div>
                    
                    <!-- Credit Note Details -->
                    <div>
                        <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #1e88e5; font-size: 16px; text-align: right;'>CREDIT NOTE DETAILS</h3>
                        <div style='background-color: #f8fafc; padding: 16px; border-radius: 8px; text-align: right;'>
                            <p style='margin: 0 0 8px 0;'><span style='color: #666; font-size: 14px;'>Credit Note #:</span> <span style='color: #1e88e5; font-weight: 600;'>{$creditNote->credit_note_number}</span></p>
                            <p style='margin: 0 0 8px 0;'><span style='color: #666; font-size: 14px;'>RMA #:</span> <span style='color: #1e88e5; font-weight: 600;'>{$creditNote->rma->rma_number}</span></p>
                            <p style='margin: 0 0 8px 0;'><span style='color: #666; font-size: 14px;'>Issue Date:</span> {$creditNote->issue_date->format('F j, Y')}</p>
                        </div>
                    </div>
                
                    <!-- Bill To -->
                    <div>
                        <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #1e88e5; font-size: 16px;'>BILL TO</h3>
                        <div style='background-color: #f8fafc; padding: 16px; border-radius: 8px;'>
                            <p style='margin: 0 0 8px 0; font-size: 16px; font-weight: 600;'>{$creditNote->customer->user->name}</p>
                            <p style='margin: 0 0 8px 0; color: #555;'>{$creditNote->customer->user->email}</p>
                            <p style='margin: 0 0 4px 0;'>{$creditNote->customer->address}</p>
                            <p style='margin: 0 0 4px 0;'>{$creditNote->customer->city}, {$creditNote->customer->country}</p>
                            <p style='margin: 0;'>Postal Code: {$creditNote->customer->postal_code}</p>
                        </div>
                    </div>
                    
                    <!-- Contact Information -->
                    <div>
                        <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #1e88e5; font-size: 16px; text-align: right;'>CONTACT INFORMATION</h3>
                        <div style='background-color: #f8fafc; padding: 16px; border-radius: 8px; text-align: right;'>
                            <p style='margin: 0 0 8px 0;'><span style='color: #666; font-size: 14px;'>Created By:</span> {$creditNote->createdBy->name}</p>
                            <p style='margin: 0;'><span style='color: #666; font-size: 14px;'>Email:</span> {$creditNote->createdBy->email}</p>
                        </div>
                    </div>
                </div>

                <!-- Total Amount -->
                <div style='margin: 40px 0; background-color: #f0f7ff; padding: 24px; border-radius: 8px; text-align: center; border-left: 4px solid #1e88e5;'>
                    <h3 style='color: #2c3e50; margin: 0 0 10px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;'>Total Credit Amount</h3>
                    <p style='margin: 0; font-size: 28px; font-weight: 600; color: #1e88e5;'>" . number_format($creditNote->total_amount, 2) . "</p>
                </div>";

    // Add notes if they exist
    if ($creditNote->notes) {
        $emailContent .= "
                <!-- Notes Section -->
                <div style='margin-bottom: 30px;'>
                    <h3 style='color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #1e88e5; font-size: 16px;'>NOTES</h3>
                    <div style='background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #1e88e5;'>
                        <p style='margin: 0; color: #555; line-height: 1.7;'>{$creditNote->notes}</p>
                    </div>
                </div>";
    }

    // Closing content
    $emailContent .= "
                <!-- Footer -->
                <div style='margin-top: 40px; padding-top: 25px; border-top: 1px solid #e0e0e0; text-align: center; color: #777;'>
                    <p style='margin: 0 0 10px 0; font-size: 15px;'>Thank you for your business!</p>
                    <p style='margin: 0 0 15px 0; font-size: 14px;'>This credit note can be applied to future purchases.</p>
                    <div style='margin: 20px 0;'>
                        <a href='#' style='display: inline-block; background-color: #1e88e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;'>View Credit Note</a>
                    </div>
                    <p style='margin: 0; font-size: 13px; color: #999;'>© ".date('Y')." Devcir. All rights reserved.</p>
                </div>
            </div>
        </div>
    ";

    // Get recipient email from request or use customer email
    $recipientEmail = $request->input('email', $creditNote->customer->user->email);

    // Send email
    Mail::html($emailContent, function ($message) use ($creditNote, $recipientEmail) {
        $message->to($recipientEmail)
                ->subject('Credit Note #' . $creditNote->credit_note_number . ' | Devcir Co');
    });

    return response()->json(['message' => 'Credit note email sent successfully']);
}

}