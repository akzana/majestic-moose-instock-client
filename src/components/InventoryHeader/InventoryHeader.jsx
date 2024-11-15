import React from 'react';
import "./InventoryHeader.scss";

export default function InventoryHeader() {
    return (
        <div className='inventory'>
            <h1 className="inventory__heading">Inventory</h1>
            <input type="text" className="inventory__search-bar" placeholder='Search...'/>
            <button className="inventory__button">+ Add New Item</button>
        </div>
    )
}
