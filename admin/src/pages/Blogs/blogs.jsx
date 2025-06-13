import React, { useState } from 'react'
import BlogTable from './blogsTable';
import AddBlog from './addBlogs';

const Blog = () => {
    const [view, setView] = useState('table');

    const handleToggleView = (viewName) => {
        setView(viewName);
    };

    const setViewToTable = () => {
        setView('table');
    };

    return (
        <div>
            {view === 'table' && <BlogTable onAddBlogClick={() => handleToggleView('add')} />}
            {view === 'add' && <AddBlog 
                onBackClick={() => handleToggleView('table')} 
                setViewToTable={setViewToTable} 
                onAddBlogClick={setViewToTable} 
            />}
        </div>
    )
}

export default Blog;
