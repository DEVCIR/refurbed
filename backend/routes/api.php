<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\EmailCampaignController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InventoryHistoryController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PurchaseOrderItemController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CampaignRecipientController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoiceItemController;
use App\Http\Controllers\RmaController;
use App\Http\Controllers\RmaItemController;
use App\Http\Controllers\CreditNoteController;
use App\Http\Controllers\CreditNoteItemController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ListingHistoryController;
use App\Http\Controllers\ReportTemplateController;
use App\Http\Controllers\GeneratedReportController;
use App\Http\Controllers\DeliveryNoteController;
use App\Http\Controllers\DeliveryNoteItemController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\NewsletterPromotionalController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\GradingController;


Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);


Route::get('/email-templates', [EmailTemplateController::class, 'index']);
Route::post('/email-templates', [EmailTemplateController::class, 'store']);
Route::get('/email-templates/{id}', [EmailTemplateController::class, 'show']);
Route::put('/email-templates/{id}', [EmailTemplateController::class, 'update']);
Route::delete('/email-templates/{id}', [EmailTemplateController::class, 'destroy']);


Route::get('/permissions', [PermissionController::class, 'index']); 
Route::post('/permissions', [PermissionController::class, 'store']); 
Route::put('/permissions/{permission}', [PermissionController::class, 'update']);
Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy']);


Route::get('/user-permissions', [UserPermissionController::class, 'index']); 
Route::post('/user-permissions', [UserPermissionController::class, 'store']);
Route::put('/user-permissions/{userPermission}', [UserPermissionController::class, 'update']); 
Route::delete('/user-permissions/{userPermission}', [UserPermissionController::class, 'destroy']); 

// brands
Route::get('/brands', [BrandController::class, 'index']);
Route::post('/brands', [BrandController::class, 'store']);
Route::get('/brands/{id}', [BrandController::class, 'show']);
Route::put('/brands/{id}', [BrandController::class, 'update']);
Route::delete('/brands/{id}', [BrandController::class, 'destroy']);
Route::get('/brands/search', [BrandController::class, 'search']);


// email campaigns
Route::get('/email-campaigns', [EmailCampaignController::class, 'index']);
Route::post('/email-campaigns', [EmailCampaignController::class, 'store']);
Route::get('/email-campaigns/{id}', [EmailCampaignController::class, 'show']);
Route::put('/email-campaigns/{id}', [EmailCampaignController::class, 'update']);
Route::delete('/email-campaigns/{id}', [EmailCampaignController::class, 'destroy']);


// expense category
Route::get('/expense-categories', [ExpenseCategoryController::class, 'index']);
Route::post('/expense-categories', [ExpenseCategoryController::class, 'store']);
Route::get('/expense-categories/{id}', [ExpenseCategoryController::class, 'show']);
Route::put('/expense-categories/{id}', [ExpenseCategoryController::class, 'update']);
Route::delete('/expense-categories/{id}', [ExpenseCategoryController::class, 'destroy']);


Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);


Route::get('/inventory', [InventoryController::class, 'index']);
Route::post('/inventory', [InventoryController::class, 'store']);
Route::post('/inventory/{inventory}', [InventoryController::class, 'update']);
Route::delete('/inventory/{inventory}', [InventoryController::class, 'destroy']);


// subscriber
Route::get('/subscribers', [SubscriberController::class, 'index']);
Route::post('/subscribers', [SubscriberController::class, 'store']);
Route::get('/subscribers/{id}', [SubscriberController::class, 'show']);
Route::put('/subscribers/{id}', [SubscriberController::class, 'update']);
Route::delete('/subscribers/{id}', [SubscriberController::class, 'destroy']);


// expense
Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::get('/expenses/{id}', [ExpenseController::class, 'show']);
Route::put('/expenses/{id}', [ExpenseController::class, 'update']);
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);


// supplier
Route::get('/suppliers', [SupplierController::class, 'index']);
Route::post('/suppliers', [SupplierController::class, 'store']);
Route::get('/suppliers/{id}', [SupplierController::class, 'show']);
Route::put('/suppliers/{id}', [SupplierController::class, 'update']);
Route::delete('/suppliers/{id}', [SupplierController::class, 'destroy']);


Route::get('/inventory-history', [InventoryHistoryController::class, 'index']);
Route::post('/inventory-history', [InventoryHistoryController::class, 'store']);
Route::put('/inventory-history/{history}', [InventoryHistoryController::class, 'update']);
Route::delete('/inventory-history/{history}', [InventoryHistoryController::class, 'destroy']);


// order
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::put('/orders/{id}', [OrderController::class, 'update']);
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);


Route::get('/purchase-orders', [PurchaseOrderController::class, 'index']);
Route::post('/purchase-orders', [PurchaseOrderController::class, 'store']);
Route::put('/purchase-orders/{purchaseOrder}', [PurchaseOrderController::class, 'update']);
Route::delete('/purchase-orders/{purchaseOrder}', [PurchaseOrderController::class, 'destroy']);


Route::get('/purchase-order-items', [PurchaseOrderItemController::class, 'index']);
Route::post('/purchase-order-items', [PurchaseOrderItemController::class, 'store']);
Route::put('/purchase-order-items/{purchaseOrderItem}', [PurchaseOrderItemController::class, 'update']);
Route::delete('/purchase-order-items/{purchaseOrderItem}', [PurchaseOrderItemController::class, 'destroy']);


// marketplace
Route::get('/marketplaces', [MarketplaceController::class, 'index']);
Route::post('/marketplaces', [MarketplaceController::class, 'store']);
Route::get('/marketplaces/{id}', [MarketplaceController::class, 'show']);
Route::put('/marketplaces/{id}', [MarketplaceController::class, 'update']);
Route::delete('/marketplaces/{id}', [MarketplaceController::class, 'destroy']);


// campaign recipients
Route::get('/campaign-recipients', [CampaignRecipientController::class, 'index']);
Route::post('/campaign-recipients', [CampaignRecipientController::class, 'store']);
Route::get('/campaign-recipients/{id}', [CampaignRecipientController::class, 'show']);
Route::put('/campaign-recipients/{id}', [CampaignRecipientController::class, 'update']);
Route::delete('/campaign-recipients/{id}', [CampaignRecipientController::class, 'destroy']);

// customer
Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);


Route::get('/order-items', [OrderItemController::class, 'index']);
Route::post('/order-items', [OrderItemController::class, 'store']);
Route::put('/order-items/{orderItem}', [OrderItemController::class, 'update']);
Route::delete('/order-items/{orderItem}', [OrderItemController::class, 'destroy']);

Route::get('/invoices', [InvoiceController::class, 'index']);
Route::post('/invoices', [InvoiceController::class, 'store']);
Route::put('/invoices/{invoice}', [InvoiceController::class, 'update']);
Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy']);


Route::get('/invoice-items', [InvoiceItemController::class, 'index']);
Route::post('/invoice-items', [InvoiceItemController::class, 'store']);
Route::put('/invoice-items/{invoiceItem}', [InvoiceItemController::class, 'update']);
Route::delete('/invoice-items/{invoiceItem}', [InvoiceItemController::class, 'destroy']);


Route::get('/rmas', [RmaController::class, 'index']);
Route::post('/rmas', [RmaController::class, 'store']);
Route::put('/rmas/{rma}', [RmaController::class, 'update']);
Route::delete('/rmas/{rma}', [RmaController::class, 'destroy']);


Route::get('/rma-items', [RmaItemController::class, 'index']);
Route::post('/rma-items', [RmaItemController::class, 'store']);
Route::put('/rma-items/{rmaItem}', [RmaItemController::class, 'update']);
Route::delete('/rma-items/{rmaItem}', [RmaItemController::class, 'destroy']); 


Route::get('/credit-notes', [CreditNoteController::class, 'index']);
Route::post('/credit-notes', [CreditNoteController::class, 'store']);
Route::put('/credit-notes/{creditNote}', [CreditNoteController::class, 'update']);
Route::delete('/credit-notes/{creditNote}', [CreditNoteController::class, 'destroy']);

Route::get('/credit-notes-item', [CreditNoteItemController::class, 'index']);
Route::post('/credit-notes-item', [CreditNoteItemController::class, 'store']);
Route::put('/credit-notes-item/{creditNoteItem}', [CreditNoteItemController::class, 'update']);
Route::delete('/credit-notes-item/{creditNoteItem}', [CreditNoteItemController::class, 'destroy']);


Route::get('/listings', [ListingController::class, 'index']);
Route::post('/listings', [ListingController::class, 'store']); 
Route::get('/listings/{listing}', [ListingController::class, 'show']);
Route::put('/listings/{listing}', [ListingController::class, 'update']); 
Route::delete('/listings/{listing}', [ListingController::class, 'destroy']); 


Route::get('/listing-history', [ListingHistoryController::class, 'index']);
Route::post('/listing-history', [ListingHistoryController::class, 'store']);
Route::put('/listing-history/{history}', [ListingHistoryController::class, 'update']);
Route::delete('/listing-history/{history}', [ListingHistoryController::class, 'destroy']);


Route::get('/report-templates', [ReportTemplateController::class, 'index']);
Route::post('/report-templates', [ReportTemplateController::class, 'store']);
Route::put('/report-templates/{template}', [ReportTemplateController::class, 'update']);
Route::delete('/report-templates/{template}', [ReportTemplateController::class, 'destroy']);

Route::get('/generated-reports', [GeneratedReportController::class, 'index']);
Route::post('/generated-reports', [GeneratedReportController::class, 'store']);
Route::put('/generated-reports/{report}', [GeneratedReportController::class, 'update']); 
Route::delete('/generated-reports/{report}', [GeneratedReportController::class, 'destroy']);


// delivery notes
Route::get('/delivery-notes', [DeliveryNoteController::class, 'index']);
Route::post('/delivery-notes', [DeliveryNoteController::class, 'store']);
Route::get('/delivery-notes/{deliveryNote}', [DeliveryNoteController::class, 'show']);
Route::put('/delivery-notes/{deliveryNote}', [DeliveryNoteController::class, 'update']);
Route::delete('/delivery-notes/{deliveryNote}', [DeliveryNoteController::class, 'destroy']);


// delivery note items
Route::get('/delivery-note-items', [DeliveryNoteItemController::class, 'index']);
Route::post('/delivery-note-items', [DeliveryNoteItemController::class, 'store']);
Route::get('/delivery-note-items/{deliveryNoteItem}', [DeliveryNoteItemController::class, 'show']);
Route::put('/delivery-note-items/{deliveryNoteItem}', [DeliveryNoteItemController::class, 'update']);
Route::delete('/delivery-note-items/{deliveryNoteItem}', [DeliveryNoteItemController::class, 'destroy']);

// newsletter

Route::get('/newsletter', [NewsletterController::class, 'index']);
Route::post('/newsletter', [NewsletterController::class, 'store']);
Route::get('/newsletter/emails', [NewsletterController::class, 'emails']);  
Route::get('/newsletter/count', [NewsletterController::class, 'emailCount']);
Route::get('/newsletter/{id}', [NewsletterController::class, 'show']);     
Route::put('/newsletter/{id}', [NewsletterController::class, 'update']);
Route::delete('/newsletter/{id}', [NewsletterController::class, 'destroy']);
    


// voucher 
Route::get('/voucher', [VoucherController::class, 'index']);
Route::post('/voucher', [VoucherController::class, 'store']);
Route::get('/voucher/{id}', [VoucherController::class, 'show']);
Route::get('vouchers/secret/{voucher_secret_id}', [VoucherController::class, 'getByVoucherSecretId']);
Route::put('/voucher/{id}', [VoucherController::class, 'update']);
Route::delete('/voucher/{id}', [VoucherController::class, 'destroy']);


// sent email route
Route::post('/sendsubscriptionmail', [EmailController::class, 'sendLoginMessage']);
Route::post('/send-invoice-email/{invoice}', [EmailController::class, 'sendInvoiceEmail']);
Route::post('/send-promotional-email', [EmailController::class, 'sendPromotionalEmail']);
Route::post('/send-credit-note-email/{creditNoteId}', [EmailController::class, 'sendCreditNoteEmail']);

// newsletter promotional

Route::get('/newsletter-promotional', [NewsletterPromotionalController::class, 'index']);
Route::post('/newsletter-promotional', [NewsletterPromotionalController::class, 'store']);
Route::get('/newsletter-promotional/count', [NewsletterPromotionalController::class, 'promotionalEmail']);
Route::get('/newsletter-promotional/{id}', [NewsletterPromotionalController::class, 'show']);
Route::put('/newsletter-promotional/{id}', [NewsletterPromotionalController::class, 'update']);
Route::delete('/newsletter-promotional/{id}', [NewsletterPromotionalController::class, 'destroy']);

// product category
Route::get('/product-categories', [ProductCategoryController::class, 'index']);
Route::post('/product-categories', [ProductCategoryController::class, 'store']);
Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show']);
Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update']);
Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy']);

// blog
Route::get('/blog', [BlogController::class, 'index']);
Route::post('/blog', [BlogController::class, 'store']);
Route::get('/blog/{id}', [BlogController::class, 'show']);
Route::put('/blog/{id}', [BlogController::class, 'update']);
Route::delete('/blog/{id}', [BlogController::class, 'destroy']);


// grading 
Route::get('/gradings', [GradingController::class, 'index']); 
Route::post('/gradings', [GradingController::class, 'store']); 
Route::get('/gradings/{id}', [GradingController::class, 'show']); 
Route::delete('/gradings/{id}', [GradingController::class, 'destroy']);
Route::put('/gradings/{id}', [GradingController::class, 'update']); 

// Authentication Routes
Route::middleware(['api.key'])->group(function () {

    Route::middleware(['auth:sanctum'])->group(function () {
       
    });

});