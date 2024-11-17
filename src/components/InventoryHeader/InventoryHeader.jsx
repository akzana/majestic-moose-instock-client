import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./InventoryHeader.scss";


export default function InventoryHeader() {
    const navigate = useNavigate();
    return (
        <div className='inventory'>
            <h1 className="inventory__heading">Inventory</h1>
            <input type="text" className="inventory__search-bar" placeholder='Search...'/>
            <button className="inventory__button" onClick={() => navigate("/inventory/add")}>+ Add New Item</button>
        </div>
    )
}
