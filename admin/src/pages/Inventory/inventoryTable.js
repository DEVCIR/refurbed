import React, { useEffect, useState } from "react"

import { Row, Col, Card, CardBody, Button, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Dropdown, DropdownToggle, DropdownMenu, Badge } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { API_BASE_URL } from '../../Service';

// Add custom CSS for better table responsiveness
const customTableStyles = `
    @media (max-width: 1600px) {
        .inventory-table-container {
            font-size: 0.75rem !important;
        }
        .inventory-table-container th,
        .inventory-table-container td {
            padding: 0.35rem 0.25rem !important;
        }
        .inventory-table-container .btn {
            font-size: 0.65rem !important;
            padding: 0.25rem 0.35rem !important;
        }
        .inventory-table-container .badge {
            font-size: 0.65rem !important;
            padding: 0.25rem 0.35rem !important;
        }
    }
    @media (max-width: 1400px) {
        .inventory-table-container {
            font-size: 0.7rem !important;
        }
        .inventory-table-container th,
        .inventory-table-container td {
            padding: 0.3rem 0.2rem !important;
        }
        .inventory-table-container .btn {
            font-size: 0.6rem !important;
            padding: 0.2rem 0.3rem !important;
        }
        .inventory-table-container .badge {
            font-size: 0.6rem !important;
            padding: 0.2rem 0.3rem !important;
        }
    }
    @media (max-width: 1200px) {
        .inventory-table-container {
            font-size: 0.65rem !important;
        }
        .inventory-table-container th,
        .inventory-table-container td {
            padding: 0.25rem 0.15rem !important;
        }
        .inventory-table-container .btn {
            font-size: 0.55rem !important;
            padding: 0.15rem 0.25rem !important;
        }
        .inventory-table-container .badge {
            font-size: 0.55rem !important;
            padding: 0.15rem 0.25rem !important;
        }
    }
    @media (max-width: 1000px) {
        .inventory-table-container {
            font-size: 0.6rem !important;
        }
        .inventory-table-container th,
        .inventory-table-container td {
            padding: 0.2rem 0.1rem !important;
        }
        .inventory-table-container .btn {
            font-size: 0.5rem !important;
            padding: 0.1rem 0.2rem !important;
        }
        .inventory-table-container .badge {
            font-size: 0.5rem !important;
            padding: 0.1rem 0.2rem !important;
        }
    }
    @media (max-width: 800px) {
        .inventory-table-container {
            font-size: 0.55rem !important;
        }
        .inventory-table-container th,
        .inventory-table-container td {
            padding: 0.15rem 0.05rem !important;
        }
        .inventory-table-container .btn {
            font-size: 0.45rem !important;
            padding: 0.05rem 0.15rem !important;
        }
        .inventory-table-container .badge {
            font-size: 0.45rem !important;
            padding: 0.05rem 0.15rem !important;
        }
    }
    .inventory-table-container table {
        width: 100% !important;
        table-layout: fixed !important;
    }
    .inventory-table-container th,
    .inventory-table-container td {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
`;

const InventoryTable = ( props ) =>
{
    const navigate = useNavigate()
    document.title = "Responsive Table | Lexa - Responsive Bootstrap 5 Admin Dashboard";
    const [ incrementModal, setIncrementModal ] = useState( false );
    const [ incrementValue, setIncrementValue ] = useState( 0 );

    const [ filterDropdownOpen, setFilterDropdownOpen ] = useState( false );
    const [ modelFilter, setModelFilter ] = useState( "" );
    const [ brandFilter, setBrandFilter ] = useState( "" );
    const [ serialNoFilter, setSerialNoFilter ] = useState( "" );
    const [ conditionFilter, setConditionFilter ] = useState( "" );
    const [ supplierFilter, setSupplierFilter ] = useState( "" );
    const [ imeiFilter, setImeiFilter ] = useState( "" );
    const [ purchasePriceFilter, setPurchasePriceFilter ] = useState( "" );
    const [ sellingPriceFilter, setSellingPriceFilter ] = useState( "" );
    const [ discountPriceFilter, setDiscountPriceFilter ] = useState( "" );
    const [ wholesalePriceFilter, setWholesalePriceFilter ] = useState( "" );
    const [ showMoreFilters, setShowMoreFilters ] = useState( false );
    const [ discountTypeFilter, setDiscountTypeFilter ] = useState( "" );
    const [ purchaseOrderNoFilter, setPurchaseOrderNoFilter ] = useState( "" );
    const [ stockStatusFilter, setStockStatusFilter ] = useState( "" );
    const [ colorFilter, setColorFilter ] = useState( "" );
    const [ networkTypeFilter, setNetworkTypeFilter ] = useState( "" );
    const [ categoryFilter, setCategoryFilter ] = useState( "" );

    const [ isFilterApplied, setIsFilterApplied ] = useState( false );

    const toggleFilterDropdown = () => setFilterDropdownOpen( prevState => !prevState );

    const handleDownloadWithIncrement = () =>
    {
        setIncrementModal( true );
    };

    const fetchInventoryData = async (
        modelFilter = "",
        brandFilter = "",
        supplierFilter = "",
        serialNoFilter = "",
        imeiFilter = "",
        conditionFilter = "",
        purchasePriceFilter = "",
        sellingPriceFilter = "",
        discountPriceFilter = "",
        wholesalePriceFilter = "",
        discountTypeFilter = "",
        purchaseOrderNoFilter = "",
        stockStatusFilter = "",
        colorFilter = "",
        networkTypeFilter = "",
        categoryFilter = ""
    ) =>
    {
        try
        {
            let url = `${API_BASE_URL}/inventory`;
            const params = new URLSearchParams();

            // Existing filters
            if ( modelFilter ) params.append( 'model_name', modelFilter );
            if ( brandFilter ) params.append( 'brand_name', brandFilter );
            if ( supplierFilter ) params.append( 'supplier', supplierFilter );
            if ( serialNoFilter ) params.append( 'serial_no', serialNoFilter );
            if ( imeiFilter ) params.append( 'imei', imeiFilter );
            if ( conditionFilter ) params.append( 'condition', conditionFilter );
            if ( purchasePriceFilter ) params.append( 'purchase_price', purchasePriceFilter );
            if ( sellingPriceFilter ) params.append( 'selling_price', sellingPriceFilter );
            if ( discountPriceFilter ) params.append( 'discount_price', discountPriceFilter );
            if ( wholesalePriceFilter ) params.append( 'wholesale_price', wholesalePriceFilter );

            // New filters
            if ( discountTypeFilter ) params.append( 'discount_type', discountTypeFilter );
            if ( purchaseOrderNoFilter ) params.append( 'purchase_order_no', purchaseOrderNoFilter );
            if ( stockStatusFilter ) params.append( 'stock_status', stockStatusFilter );
            if ( colorFilter ) params.append( 'color', colorFilter );
            if ( networkTypeFilter ) params.append( 'network_type', networkTypeFilter );
            if ( categoryFilter ) params.append( 'category', categoryFilter );

            if ( params.toString() )
            {
                url += `? ${params.toString()}`;
            }

            const response = await fetch( url );
            const data = await response.json();
            setInventoryData( data.data.data );
        } catch ( error )
        {
            console.error( "Error fetching inventory data:", error );
        }
    };

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Tables", link: "#" },
        { title: "Responsive Table", link: "#" },
    ]

    const [ inventoryData, setInventoryData ] = useState( [] );

    useEffect( () =>
    {
        props.setBreadcrumbItems( 'Responsive Table', breadcrumbItems );
        fetchInventoryData();
    }, [ props ] );

    const applyFilter = () =>
    {
        fetchInventoryData(
            modelFilter,
            brandFilter,
            supplierFilter,
            serialNoFilter,
            imeiFilter,
            conditionFilter,
            purchasePriceFilter,
            sellingPriceFilter,
            discountPriceFilter,
            wholesalePriceFilter,
            discountTypeFilter,
            purchaseOrderNoFilter,
            stockStatusFilter,
            colorFilter,
            networkTypeFilter,
            categoryFilter
        );
        setIsFilterApplied( true );
        setFilterDropdownOpen( false );
    };

    const clearFilter = () =>
    {
        setModelFilter( "" );
        setBrandFilter( "" );
        setSupplierFilter( "" );
        setSerialNoFilter( "" );
        setImeiFilter( "" );
        setConditionFilter( "" );
        setPurchasePriceFilter( "" );
        setSellingPriceFilter( "" );
        setDiscountPriceFilter( "" );
        setWholesalePriceFilter( "" );
        setDiscountTypeFilter( "" );
        setPurchaseOrderNoFilter( "" );
        setStockStatusFilter( "" );
        setColorFilter( "" );
        setNetworkTypeFilter( "" );
        setCategoryFilter( "" );
        fetchInventoryData();
        setIsFilterApplied( false );
    };

    const handleStatusChange = async ( id, status ) =>
    {
        const active = status === "Add";
        try
        {
            const response = await fetch( `${API_BASE_URL}/inventory/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { is_active: active } )
            } );

            if ( response.ok )
            {
                console.log( "Updated status for item with ID:", id );
                setInventoryData( prevData =>
                    prevData.map( item =>
                        item.id === id ? { ...item, variant: { ...item.variant, product: { ...item.variant.product, is_active: active } } } : item
                    )
                );
            } else
            {
                console.error( "Failed to update status for item with ID:", id );
            }
        } catch ( error )
        {
            console.error( "Error updating status:", error );
        }
    }

    const handleDownloadExcel = () =>
    {
        if ( !inventoryData || inventoryData.length === 0 )
        {
            console.error( "No data available to download" );
            return;
        }

        try
        {

            const excelData = inventoryData.map( ( item ) => ( {
                brand_name: item.variant?.product?.brand?.brand_name || "",
                model_name: item.variant?.product?.model_name || "",
                storage_gb: item.variant?.storage_gb || "",
                color: item.variant?.color || "",
                network_type: item?.variant?.network_type || "",
                sku: item?.variant?.product.sku || "",
                variant_id: item.variant?.id || "",
                imei: item.imei || "",
                serial_no: item.serial_no || "",
                barcode: item.barcode || "",
                condition: item.condition || "",
                description: item?.variant?.product?.description || "",
                purchase_price: item.purchase_price || "",
                selling_price: item.discount_type === 'percentage'
                    ? ( item.selling_price - ( item.selling_price * ( item.discount_price / 100 ) ) ).toFixed( 2 )
                    : ( item.selling_price - item.discount_price ).toFixed( 2 ) || "",
                discount_type: item.discount_type || "",
                discount_price: item.discount_price || "",
                wholesale_price: item.wholesale_price || "",
                purchase_order_no: item.purchase_order_no || "",
                supplier_id: item.supplier_id || "",
                stock_status: item.stock_status || "",
                notes: item.notes || "",
                is_active: item.is_active ? "Yes" : "No",
            } ) );


            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet( excelData );

            XLSX.utils.book_append_sheet( wb, ws, "Inventory Data" );

            XLSX.writeFile( wb, "Inventory_Data.xlsx" );
        } catch ( error )
        {
            console.error( "Error generating Excel file:", error );
        }
    };


    const confirmDownloadWithIncrement = () =>
    {
        if ( !inventoryData || inventoryData.length === 0 )
        {
            console.error( "No data available to download" );
            return;
        }

        try
        {
            const increment = parseFloat( incrementValue ) || 0;

            const excelData = inventoryData.map( ( item ) => ( {
                brand_name: item.variant?.product?.brand?.brand_name || "",
                model_name: item.variant?.product?.model_name || "",
                storage_gb: item.variant?.storage_gb || "",
                color: item.variant?.color || "",
                network_type: item?.variant?.network_type || "",
                sku: item?.variant?.product.sku || "",
                variant_id: item.variant?.id || "",
                imei: item.imei || "",
                serial_no: item.serial_no || "",
                barcode: item.barcode || "",
                condition: item.condition || "",
                description: item?.variant?.product?.description || "",
                purchase_price: ( parseFloat( item.purchase_price ) || 0 ) + ( parseFloat( item.purchase_price ) * parseFloat( increment / 100 ) ),
                selling_price: item.discount_type === 'percentage'
                    ? ( ( item.selling_price - ( item.selling_price * ( item.discount_price / 100 ) ) ) + ( parseFloat( ( item.selling_price - ( item.selling_price * ( item.discount_price / 100 ) ) ) ) * parseFloat( increment / 100 ) ) ).toFixed( 2 )
                    : ( item.selling_price - item.discount_price + ( parseFloat( item.selling_price - item.discount_price ) * parseFloat( increment / 100 ) ) ).toFixed( 2 ),
                discount_type: item.discount_type || "",
                discount_price: ( parseFloat( item.discount_price ) || 0 ) + ( parseFloat( item.discount_price ) * parseFloat( increment / 100 ) ),
                wholesale_price: ( parseFloat( item.wholesale_price ) || 0 ) + ( parseFloat( item.wholesale_price ) * parseFloat( increment / 100 ) ),
                purchase_order_no: item.purchase_order_no || "",
                supplier_id: item.supplier_id || "",
                stock_status: item.stock_status || "",
                notes: item.notes || "",
                is_active: item.is_active ? "Yes" : "No",
            } ) );


            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet( excelData );

            XLSX.utils.book_append_sheet( wb, ws, "Inventory Data" );

            XLSX.writeFile( wb, `Inventory_Data_with_Increment_${increment}.xlsx` );

            setIncrementModal( false );
            setIncrementValue( 0 );
        } catch ( error )
        {
            console.error( "Error generating Excel file with increment:", error );
        }
    };

    // Custom styles for responsive table
    const tableStyles = {
        container: {
            overflowX: 'auto',
            minWidth: '100%'
        },
        table: {
            minWidth: '100%', // Changed from 800px to 100% to fit container
            fontSize: '0.75rem', // Reduced font size for better fit
            tableLayout: 'fixed' // Fixed table layout for better column control
        },
        mobileCard: {
            border: '1px solid #dee2e6',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
            padding: '1rem'
        },
        mobileRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderBottom: '1px solid #f8f9fa'
        },
        mobileLabel: {
            fontWeight: 'bold',
            color: '#6c757d',
            minWidth: '120px'
        },
        mobileValue: {
            textAlign: 'right',
            flex: '1'
        },
        buttonGroup: {
            display: 'flex',
            gap: '0.25rem',
            flexWrap: 'wrap'
        },
        // New styles for better column management
        imageCell: {
            width: '40px',
            minWidth: '40px',
            maxWidth: '40px'
        },
        modelCell: {
            width: '12%',
            minWidth: '80px',
            maxWidth: '120px'
        },
        skuCell: {
            width: '10%',
            minWidth: '70px',
            maxWidth: '100px'
        },
        serialCell: {
            width: '12%',
            minWidth: '80px',
            maxWidth: '120px'
        },
        brandCell: {
            width: '10%',
            minWidth: '70px',
            maxWidth: '100px'
        },
        conditionCell: {
            width: '8%',
            minWidth: '60px',
            maxWidth: '80px'
        },
        supplierCell: {
            width: '12%',
            minWidth: '80px',
            maxWidth: '120px'
        },
        priceCell: {
            width: '8%',
            minWidth: '60px',
            maxWidth: '80px'
        },
        actionCell: {
            width: '15%',
            minWidth: '100px',
            maxWidth: '150px'
        }
    };

    // Mobile card view component
    const MobileCardView = ( { item } ) => (
        <div style={tableStyles.mobileCard}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <img
                    src={item.variant.product.feature_imageUrl}
                    alt={item.variant.product.model_name}
                    style={{ width: '60px', height: '60px', marginRight: '1rem', borderRadius: '0.375rem' }}
                />
                <div>
                    <h6 style={{ margin: 0, fontWeight: 'bold' }}>{item.variant.product.model_name}</h6>
                    <small style={{ color: '#6c757d' }}>{item.variant.product.brand.brand_name}</small>
                </div>
            </div>

            <div style={tableStyles.mobileRow}>
                <span style={tableStyles.mobileLabel}>SKU:</span>
                <span style={tableStyles.mobileValue}>{item.variant.product.sku}</span>
            </div>

            <div style={tableStyles.mobileRow}>
                <span style={tableStyles.mobileLabel}>Serial No:</span>
                <span style={tableStyles.mobileValue}>{item.serial_no}</span>
            </div>

            <div style={tableStyles.mobileRow}>
                <span style={tableStyles.mobileLabel}>Condition:</span>
                <span style={tableStyles.mobileValue}>
                    <Badge color={item.condition === 'Excellent' ? 'success' : item.condition === 'Good' ? 'warning' : 'secondary'}>
                        {item.condition}
                    </Badge>
                </span>
            </div>

            <div style={tableStyles.mobileRow}>
                <span style={tableStyles.mobileLabel}>Purchase Price:</span>
                <span style={tableStyles.mobileValue}>${item.purchase_price}</span>
            </div>

            <div style={tableStyles.mobileRow}>
                <span style={tableStyles.mobileLabel}>Selling Price:</span>
                <span style={tableStyles.mobileValue}>${item.selling_price}</span>
            </div>

            <div style={tableStyles.mobileRow}>
                <span style={tableStyles.mobileLabel}>Discounted Price:</span>
                <span style={tableStyles.mobileValue}>
                    ${item.discount_type === 'percentage'
                        ? ( item.selling_price - ( item.selling_price * ( item.discount_price / 100 ) ) ).toFixed( 2 )
                        : ( item.selling_price - item.discount_price ).toFixed( 2 )}
                </span>
            </div>

            <div style={tableStyles.mobileRow}>
                <span style={tableStyles.mobileLabel}>Supplier:</span>
                <span style={tableStyles.mobileValue}>{item.supplier.user.name}</span>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <div style={tableStyles.buttonGroup}>
                    <Button
                        size="sm"
                        color={item.variant.product.is_active ? "success" : "secondary"}
                        onClick={() => handleStatusChange( item.id, "Add" )}
                    >
                        Available
                    </Button>
                    <Button
                        size="sm"
                        color={!item.variant.product.is_active ? "danger" : "secondary"}
                        onClick={() => handleStatusChange( item.id, "Remove" )}
                    >
                        Out of Stock
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <style>{customTableStyles}</style>
            <Row style={{ minHeight: '70vh' }}>
                <Col>
                    <Card>
                        <CardBody>
                            <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'marginBottom': '10px', flexWrap: 'wrap', gap: '0.5rem' }}>

                                <Col>
                                    <CardTitle className="h4">Inventory Table</CardTitle>
                                </Col>
                                <Col style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} className="text-end">
                                    <Button color="primary" size="sm" onClick={handleDownloadWithIncrement}>Download with Increment</Button>
                                    <Button color="info" size="sm" onClick={handleDownloadExcel}>Download Excel</Button>
                                    <Button color="secondary" size="sm" onClick={() => { navigate( '/live-inventory' ) }}>Upload Products By Name</Button>
                                    <Button color="secondary" size="sm" onClick={() => { navigate( '/inventory-upload' ) }}>Upload Products File</Button>
                                    <Button color="success" size="sm" onClick={props.onAddProductClick}>Add Inventory</Button>
                                </Col>
                            </div>
                            <Row className="mb-3">
                                <Col>
                                    <Dropdown isOpen={filterDropdownOpen} toggle={toggleFilterDropdown}>
                                        <DropdownToggle color="light" caret>
                                            Filter
                                        </DropdownToggle>

                                        <DropdownMenu style={{
                                            width: '90vw',
                                            maxWidth: '600px',
                                            height: '60vh',
                                            overflowY: 'scroll',
                                            padding: '10px'
                                        }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <div className="row" style={{ margin: 0 }}>
                                                    <div className="col-md-6">
                                                        <Label>Model Name</Label>
                                                        <Input
                                                            type="text"
                                                            value={modelFilter}
                                                            onChange={( e ) => setModelFilter( e.target.value )}
                                                            placeholder="Enter model"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Label>Brand Name</Label>
                                                        <Input
                                                            type="text"
                                                            value={brandFilter}
                                                            onChange={( e ) => setBrandFilter( e.target.value )}
                                                            placeholder="Enter brand"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="row" style={{ margin: 0 }}>
                                                    <div className="col-md-4">
                                                        <Label>Serial No</Label>
                                                        <Input
                                                            type="text"
                                                            value={serialNoFilter}
                                                            onChange={( e ) => setSerialNoFilter( e.target.value )}
                                                            placeholder="Enter serial"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Label>IMEI</Label>
                                                        <Input
                                                            type="text"
                                                            value={imeiFilter}
                                                            onChange={( e ) => setImeiFilter( e.target.value )}
                                                            placeholder="Enter IMEI"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Label>Condition</Label>
                                                        <Input
                                                            type="text"
                                                            value={conditionFilter}
                                                            onChange={( e ) => setConditionFilter( e.target.value )}
                                                            placeholder="Enter condition"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row" style={{ margin: 0 }}>
                                                    <div className="col-md-3">
                                                        <Label>Purchase Price</Label>
                                                        <Input
                                                            type="number"
                                                            value={purchasePriceFilter}
                                                            onChange={( e ) => setPurchasePriceFilter( e.target.value )}
                                                            placeholder="$ Purchase"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label>Selling Price</Label>
                                                        <Input
                                                            type="number"
                                                            value={sellingPriceFilter}
                                                            onChange={( e ) => setSellingPriceFilter( e.target.value )}
                                                            placeholder="$ Selling"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label>Discount Price</Label>
                                                        <Input
                                                            type="number"
                                                            value={discountPriceFilter}
                                                            onChange={( e ) => setDiscountPriceFilter( e.target.value )}
                                                            placeholder="$ Discount"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label>Wholesale</Label>
                                                        <Input
                                                            type="number"
                                                            value={wholesalePriceFilter}
                                                            onChange={( e ) => setWholesalePriceFilter( e.target.value )}
                                                            placeholder="$ Wholesale"
                                                        />
                                                    </div>
                                                </div>


                                                {showMoreFilters && (
                                                    <>

                                                        <div className="row" style={{ margin: 0 }}>
                                                            <div className="col-md-3">
                                                                <Label>Discount Type</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={discountTypeFilter}
                                                                    onChange={( e ) => setDiscountTypeFilter( e.target.value )}
                                                                    placeholder="Discount type"
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <Label>PON</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={purchaseOrderNoFilter}
                                                                    onChange={( e ) => setPurchaseOrderNoFilter( e.target.value )}
                                                                    placeholder="PO number"
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <Label>Stock Status</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={stockStatusFilter}
                                                                    onChange={( e ) => setStockStatusFilter( e.target.value )}
                                                                    placeholder="Stock status"
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <Label>Color</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={colorFilter}
                                                                    onChange={( e ) => setColorFilter( e.target.value )}
                                                                    placeholder="Color"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row" style={{ margin: 0 }}>
                                                            <div className="col-md-6">
                                                                <Label>Network Type</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={networkTypeFilter}
                                                                    onChange={( e ) => setNetworkTypeFilter( e.target.value )}
                                                                    placeholder="Network type"
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <Label>Category</Label>
                                                                <Input
                                                                    type="text"
                                                                    value={categoryFilter}
                                                                    onChange={( e ) => setCategoryFilter( e.target.value )}
                                                                    placeholder="Category"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="text-center">
                                                    <Button
                                                        color="link"
                                                        size="sm"
                                                        onClick={() => setShowMoreFilters( !showMoreFilters )}
                                                    >
                                                        {showMoreFilters ? (
                                                            <span><i className="mdi mdi-minus"></i> Fewer Filters</span>
                                                        ) : (
                                                            <span><i className="mdi mdi-plus"></i> More Filters</span>
                                                        )}
                                                    </Button>
                                                </div>

                                                <div className="d-flex justify-content-between mt-2">
                                                    <Button color="primary" size="sm" onClick={applyFilter}>
                                                        Apply Filter
                                                    </Button>
                                                    {isFilterApplied && (
                                                        <Button color="danger" size="sm" onClick={clearFilter}>
                                                            Clear All
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </DropdownMenu>

                                    </Dropdown>
                                </Col>
                            </Row>

                            {/* Mobile Card View */}
                            <div className="d-md-none">
                                {Array.isArray( inventoryData ) ? inventoryData.map( item => (
                                    <MobileCardView key={item.id} item={item} />
                                ) ) : (
                                    <div className="text-center p-4">No inventory data available.</div>
                                )}
                            </div>

                            {/* Desktop Table View */}
                            <div className="d-none d-md-block inventory-table-container">
                                <div className="table-rep-plugin">
                                    <div
                                        className="table-responsive mb-0"
                                        data-pattern="priority-columns"
                                        style={tableStyles.container}
                                    >
                                        <Table
                                            id="tech-companies-1"
                                            className="table table-striped table-bordered"
                                            style={tableStyles.table}
                                        >
                                            <Thead>
                                                <Tr>
                                                    <Th style={tableStyles.imageCell}>Img</Th>
                                                    <Th style={tableStyles.modelCell}>Model</Th>
                                                    <Th style={tableStyles.skuCell}>SKU</Th>
                                                    <Th style={tableStyles.serialCell}>Serial</Th>
                                                    <Th style={tableStyles.brandCell}>Brand</Th>
                                                    <Th style={tableStyles.conditionCell}>Cond</Th>
                                                    <Th style={tableStyles.supplierCell}>Supplier</Th>
                                                    <Th style={tableStyles.priceCell}>Purchase</Th>
                                                    <Th style={tableStyles.priceCell}>Selling</Th>
                                                    <Th style={tableStyles.priceCell}>Discounted</Th>
                                                    <Th style={tableStyles.actionCell}>Action</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {Array.isArray( inventoryData ) ? inventoryData.map( item => (
                                                    <Tr key={item.id}>
                                                        <Td style={tableStyles.imageCell}>
                                                            <img
                                                                src={item.variant.product.feature_imageUrl}
                                                                alt={item.variant.product.model_name}
                                                                style={{
                                                                    width: '30px',
                                                                    height: '30px',
                                                                    borderRadius: '0.25rem',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        </Td>
                                                        <Td style={tableStyles.modelCell}>
                                                            <div style={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {item.variant.product.model_name}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.skuCell}>
                                                            <div style={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {item.variant.product.sku}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.serialCell}>
                                                            <div style={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {item.serial_no}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.brandCell}>
                                                            <div style={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {item.variant.product.brand.brand_name}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.conditionCell}>
                                                            <Badge
                                                                color={item.condition === 'Excellent' ? 'success' : item.condition === 'Good' ? 'warning' : 'secondary'}
                                                            >
                                                                {item.condition === 'Excellent' ? 'Exc' : item.condition === 'Good' ? 'Good' : item.condition}
                                                            </Badge>
                                                        </Td>
                                                        <Td style={tableStyles.supplierCell}>
                                                            <div style={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {item.supplier.user.name}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.priceCell}>
                                                            <div>
                                                                ${parseFloat( item.purchase_price ).toFixed( 0 )}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.priceCell}>
                                                            <div>
                                                                ${parseFloat( item.selling_price ).toFixed( 0 )}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.priceCell}>
                                                            <div>
                                                                ${item.discount_type === 'percentage'
                                                                    ? ( item.selling_price - ( item.selling_price * ( item.discount_price / 100 ) ) ).toFixed( 0 )
                                                                    : ( item.selling_price - item.discount_price ).toFixed( 0 )}
                                                            </div>
                                                        </Td>
                                                        <Td style={tableStyles.actionCell}>
                                                            <div style={tableStyles.buttonGroup}>
                                                                <Button
                                                                    size="sm"
                                                                    color={item.variant.product.is_active ? "success" : "secondary"}
                                                                    onClick={() => handleStatusChange( item.id, "Add" )}
                                                                >
                                                                    Avail
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    color={!item.variant.product.is_active ? "danger" : "secondary"}
                                                                    onClick={() => handleStatusChange( item.id, "Remove" )}
                                                                >
                                                                    Out
                                                                </Button>
                                                            </div>
                                                        </Td>
                                                    </Tr>
                                                ) ) : (
                                                    <Tr>
                                                        <Td colSpan="11">No inventory data available.</Td>
                                                    </Tr>
                                                )}
                                            </Tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={incrementModal} toggle={() => setIncrementModal( !incrementModal )}>
                <ModalHeader toggle={() => setIncrementModal( !incrementModal )}>Enter Increment Value</ModalHeader>
                <ModalBody>
                    <Label for="incrementValue">Enter the value to increment prices:</Label>
                    <Input
                        type="number"
                        id="incrementValue"
                        value={incrementValue}
                        onChange={( e ) => setIncrementValue( e.target.value )}
                        placeholder="Enter increment value"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={confirmDownloadWithIncrement}>
                        Download with Increment
                    </Button>{' '}
                    <Button color="secondary" onClick={() => setIncrementModal( false )}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default connect( null, { setBreadcrumbItems } )( InventoryTable );