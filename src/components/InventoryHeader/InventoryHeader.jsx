import React from 'react';
import "./InventoryHeader.scss";
import searchIcon from "../../assets/Icons/search-24px.svg";
import { Link } from "react-router-dom";

export default function InventoryHeader() {
    return (
        <div className="inventory">
            <h2 className="inventory__title">Inventory</h2>
            <div className="inventory__controls">
                <div className="inventory__search">
                    <input
                        type="text"
                        className="inventory__input"
                        placeholder="Search..."
                        disabled
                    />
                    <img src={searchIcon} alt="Search Icon" className="inventory__icon" />
                </div>

                <Link
                    to="/inventory/add"
                    className="inventory__add-button primary-button" >
                    + Add New Item
                </Link>
            </div>
        </div>
    )
}
