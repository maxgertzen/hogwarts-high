import React from 'react';
import './FormPagination.css';

function FormPagination({ url }) {
    return (
        <div className="path-container mx-auto mt-2">
            {
                url &&
                ['1', '2', '3'].map((value, index) => {
                    return <div className={`dot${String(url) === value ? ' active' : ''}`} key={Math.round((index + 1) * Math.random() * 100000)}>{value}</div>
                })
            }
        </div>
    )
}

export default FormPagination