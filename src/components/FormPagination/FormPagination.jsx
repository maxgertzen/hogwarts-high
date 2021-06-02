import React, { useState, useEffect } from 'react';
import './FormPagination.css';

function FormPagination({ url }) {
    const [item, setItem] = useState('1');

    useEffect(() => {
        if (url) {
            let newItem = '' + url
            setItem(newItem)
        }
    }, [url])

    return (
        <div className="path-container mx-auto mt-2">
            {!item ? null :
                ['1', '2', '3'].map((value, index) => {
                    return <div className={`dot${item === value ? ' active' : ''}`} key={Math.round((index + 1) * Math.random() * 100000)}></div>
                })
            }
        </div>
    )
}

export default FormPagination