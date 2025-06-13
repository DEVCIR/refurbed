CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    role ENUM('admin', 'manager', 'staff', 'wholesale', 'customer') DEFAULT 'customer',
    profile_picture VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    module_name VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE UserPermissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    permission_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (permission_id) REFERENCES Permissions(id),
    UNIQUE (user_id, permission_id)
);


CREATE TABLE Brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    brand_id INT NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES Brands(id),
    UNIQUE (brand_id, model_name)
);

CREATE TABLE ProductVariants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    storage_gb INT,
    color VARCHAR(30),
    network_type VARCHAR(30),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    variant_id INT NOT NULL,
    imei VARCHAR(20) UNIQUE,
    serial_no VARCHAR(50) UNIQUE,
    barcode VARCHAR(50) UNIQUE,
    condition ENUM('Brand New', '14 Days', 'Grade A', 'Grade B', 'Grade C', 'Grade D', 'Grade E') NOT NULL,
    purchase_price DECIMAL(10,2) NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    wholesale_price DECIMAL(10,2),
    purchase_order_no VARCHAR(30),
    supplier_id INT,
    stock_status ENUM('In Stock', 'Sold', 'Returned', 'Defective') DEFAULT 'In Stock',
    date_purchased DATE,
    date_sold DATE,
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (variant_id) REFERENCES ProductVariants(id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(id)
);

CREATE TABLE InventoryHistory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    inventory_id INT NOT NULL,
    field_changed VARCHAR(50) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    changed_by INT NOT NULL,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inventory_id) REFERENCES Inventory(id),
    FOREIGN KEY (changed_by) REFERENCES Users(id)
);


CREATE TABLE Suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    contact_person VARCHAR(100),
    address TEXT,
    tax_id VARCHAR(50),
    payment_terms TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
);

CREATE TABLE PurchaseOrders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    po_number VARCHAR(30) UNIQUE NOT NULL,
    order_date DATE NOT NULL,
    expected_delivery_date DATE,
    status ENUM('Draft', 'Sent', 'Received', 'Cancelled') DEFAULT 'Draft',
    total_amount DECIMAL(10,2),
    notes TEXT,
    created_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(id),
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE PurchaseOrderItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    po_id INT NOT NULL,
    product_id INT NOT NULL,
    variant_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    received_quantity INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (po_id) REFERENCES PurchaseOrders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (variant_id) REFERENCES ProductVariants(id)
);

CREATE TABLE Customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    address TEXT,
    city VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    tax_id VARCHAR(50),
    customer_type ENUM('Retail', 'Wholesale') DEFAULT 'Retail',
    credit_limit DECIMAL(10,2),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
);

CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(30) UNIQUE NOT NULL,
    customer_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned') DEFAULT 'Pending',
    total_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    grand_total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status ENUM('Unpaid', 'Partial', 'Paid') DEFAULT 'Unpaid',
    shipping_address TEXT,
    notes TEXT,
    created_by INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (created_by) REFERENCES Users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE OrderItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(id)
);

CREATE TABLE Invoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_number VARCHAR(30) UNIQUE NOT NULL,
    order_id INT,
    customer_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled') DEFAULT 'Draft',
    template_used VARCHAR(50),
    notes TEXT,
    created_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE InvoiceItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    inventory_id INT NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES Invoices(id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(id)
);

CREATE TABLE RMAs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rma_number VARCHAR(30) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    order_id INT,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Requested', 'Approved', 'Rejected', 'Processed') DEFAULT 'Requested',
    reason TEXT NOT NULL,
    resolution TEXT,
    resolved_by INT,
    resolved_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (resolved_by) REFERENCES Users(id)
);

CREATE TABLE RMAItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rma_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity INT DEFAULT 1,
    reason TEXT,
    condition_received TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rma_id) REFERENCES RMAs(id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(id)
);

CREATE TABLE CreditNotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    credit_note_number VARCHAR(30) UNIQUE NOT NULL,
    rma_id INT,
    customer_id INT NOT NULL,
    issue_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('Draft', 'Issued', 'Applied', 'Cancelled') DEFAULT 'Draft',
    notes TEXT,
    created_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rma_id) REFERENCES RMAs(id),
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE CreditNoteItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    credit_note_id INT NOT NULL,
    inventory_id INT NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (credit_note_id) REFERENCES CreditNotes(id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(id)
);


CREATE TABLE Marketplaces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    api_credentials TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marketplace_id INT NOT NULL,
    product_id INT NOT NULL,
    listing_reference VARCHAR(100),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (marketplace_id) REFERENCES Marketplaces(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE ListingHistory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    listing_id INT NOT NULL,
    action VARCHAR(50) NOT NULL,
    details TEXT,
    changed_by INT NOT NULL,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES Listings(id),
    FOREIGN KEY (changed_by) REFERENCES Users(id)
);

CREATE TABLE ExpenseCategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TABLE Expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT,
    payment_method VARCHAR(50),
    reference_no VARCHAR(50),
    recorded_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES ExpenseCategories(id),
    FOREIGN KEY (recorded_by) REFERENCES Users(id)
);


CREATE TABLE ReportTemplates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    template_file_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

CREATE TABLE GeneratedReports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_id INT,
    report_name VARCHAR(100) NOT NULL,
    generated_by INT NOT NULL,
    generation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parameters TEXT,
    file_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES ReportTemplates(id),
    FOREIGN KEY (generated_by) REFERENCES Users(id)
);


CREATE TABLE Subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribe_token VARCHAR(100),
    last_contacted TIMESTAMP
);

CREATE TABLE EmailTemplates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_name VARCHAR(50) UNIQUE NOT NULL,
    subject VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE EmailCampaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_id INT,
    campaign_name VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    scheduled_time TIMESTAMP,
    status ENUM('Draft', 'Scheduled', 'Sent', 'Cancelled') DEFAULT 'Draft',
    sent_count INT DEFAULT 0,
    open_count INT DEFAULT 0,
    click_count INT DEFAULT 0,
    created_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES EmailTemplates(id),
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE CampaignRecipients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id INT NOT NULL,
    subscriber_id INT,
    email_address VARCHAR(100) NOT NULL,
    status ENUM('Pending', 'Sent', 'Failed', 'Opened', 'Clicked') DEFAULT 'Pending',
    sent_time TIMESTAMP,
    open_time TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES EmailCampaigns(id),
    FOREIGN KEY (subscriber_id) REFERENCES Subscribers(id)
);

CREATE TABLE DeliveryNotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    delivery_number VARCHAR(30) UNIQUE NOT NULL,
    order_id INT,
    customer_id INT NOT NULL,
    delivery_date DATE NOT NULL,
    shipping_method VARCHAR(50),
    tracking_number VARCHAR(50),
    status ENUM('Preparing', 'Shipped', 'Delivered') DEFAULT 'Preparing',
    notes TEXT,
    created_by INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (customer_id) REFERENCES Customers(id),
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE DeliveryNoteItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    delivery_note_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity INT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_note_id) REFERENCES DeliveryNotes(id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(id)
);