import React from 'react';
import "./EditInventoryItemHeader.scss";
import { Link, useParams } from 'react-router-dom'
import Arrow_back from '../../assets/Icons/arrow_back-24px.svg'


export default function EditInventoryItemHeader() {
    const { id } = useParams();
    return (
        <>
            <div className="EditInventoryItem__header">
                <Link to={`/inventory/${id}`}>
                    <img className="arrow_back" src={Arrow_back} alt="back to Inventory Item Details Page" />
                </Link>
                <h1 className="EditInventoryItem__title">
                    Edit Inventory Item
                </h1>
            </div>
        </>
    )
}