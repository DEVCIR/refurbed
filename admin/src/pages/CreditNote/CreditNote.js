import React, { useState } from 'react'
import CreditNoteTable from './CreditNoteTable';
import AddCreditNote from './AddCreditNote';
import EditCreditNote from './EditCreditNote';
import CreditNoteTemplate from './creditNoteTemplate';

const CreditNote = () => {
    const [view, setView] = useState('table');
    const [editProductId, setEditProductId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleToggleView = (viewName, productId = null) => {
        setView(viewName);
        setEditProductId(productId);
    };

    const onEditCustomer = (customerId) => {
        handleToggleView('edit', customerId);
    };

    const setViewToTable = () => {
        setView('table');
        setSelectedOrder(null);
    };

    return (
        <div>
            {selectedOrder ? (
                <CreditNoteTemplate creditNote={selectedOrder} onBackClick={setViewToTable} />
            ) : (
                <>
                    {view === 'table' && <CreditNoteTable onAddBuyerClick={() => handleToggleView('add')} onEditCustomer={onEditCustomer} onSelectOrder={setSelectedOrder} />}
                    {view === 'add' && <AddCreditNote onBackClick={() => handleToggleView('table')} setViewToTable={setViewToTable} onInventoryAdded={setViewToTable} />}
                    {view === 'edit' && <EditCreditNote customerId={editProductId} onBackClick={() => handleToggleView('table')} />}
                </>
            )}
        </div>
    )
}

export default CreditNote