import React, { useState } from 'react'
import ProductCategoryTable from './productCategoriesTable';
import AddProductCategory from './addProductCategories';

const ProductCategories = () => {
    const [view, setView] = useState('table');

    const setViewToTable = () => {
        setView('table');
    };

    return (
        <div>
            {view === 'table' && (
                <ProductCategoryTable
                    onAddCategoryClick={() => setView('add')} 
                />
            )}
            {view === 'add' && (
                <AddProductCategory 
                    onBackClick={() => setView('table')} 
                    onAddCategoryClick={setViewToTable} 
                />
            )}
        </div>
    )
}

export default ProductCategories;