import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from "../../assets/Icons/delete_outline-24px.svg";
import EditButton from "../../assets/Icons/edit-24px.svg"
import axios from 'axios';
import { useState } from 'react';

const baseURL = import.meta.env.VITE_URL;

export default function InventoryList() {
    // conditional for warehouse.id
    //axios to server
    const [inventory, setInventory] = useState([]);

    const getInventory = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/inventories`);
            setInventory(response.data);
            console.log(response.data);

        } catch (err) {
            console.error("Error retrieving inventory items", err);
        }
    }

    useEffect(() => {
        getInventory();
    }, [])

    return (
        <div>
            <ul className="inventoryList">
                {inventory.map((item) =>
                    <li className="inventoryList__item" key={item.id}>
                        <p className="inventoryList__label">INVENTORY ITEM</p>
                        <p className="inventoryList__item-title">{item.item_name}</p>
                        <p className="inventoryList__category-label">CATEGORY</p>
                        <p className="inventoryList__category">{item.category}</p>
                        <p className="inventoryList__status-label">STATUS</p>
                        <p className="inventoryList__status">{item.status}</p>
                        <p className="inventoryList__qty-label">QTY</p>
                        <p className="inventoryList__qty">{item.quantity}</p>
                        <p className="inventoryList__warehouse-label">WAREHOUSE</p>
                        <p className="inventoryList__warehouse">{item.warehouse_name}</p>
                        <Link to="/"><img src={DeleteButton} alt="delete-button" /></Link>
                        <Link><img src={EditButton} alt="" /></Link>
                    </li>
                )};
            </ul>
        </div>
    )
}