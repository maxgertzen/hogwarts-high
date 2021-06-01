import React, { useState, useEffect } from 'react';
import './FormPagination.css';

function FormPagination({ url }) {
    const [item, setItem] = useState('//');

    useEffect(() => {
        if (item) {
            let newItem = item.match(/(\d+|\/+)/ig).join('')
            setItem(newItem)
        }
    }, [item])

    return (
        <div className="path-container mx-auto my-2">
            {!item ? null :
                ['//', '2', '3'].map((value, index) => {
                    return <div className={`dot${item === value ? ' active' : ''}`} key={Math.round((index + 1) * Math.random() * 100000)}></div>
                })
            }
        </div>
    )
}

export default FormPagination