import React from 'react';
import { useRouteMatch } from "react-router-dom";
import './FormPagination.css';

function FormPagination() {
    // const [item, setItem] = useState('')
    let { url: item } = useRouteMatch()
    item = item.match(/(\d+|\/+)/).join('');

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