import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from "../../assets/Icons/delete_outline-24px.svg";
import EditButton from "../../assets/Icons/edit-24px.svg"
import axios from 'axios';
import { useState } from 'react';
import "./InventoryList.scss"

const baseURL = import.meta.env.VITE_URL;

export default function InventoryList() {
    // conditional for warehouse.id
    const [inventory, setInventory] = useState([]);

    const getInventory = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/inventories`);
            setInventory(response.data);

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
                        <label
                            for="item-name"
                            className="inventoryList__item-label">INVENTORY ITEM
                            <p
                                className="inventoryList__item-name"
                                name="item-name">{item.item_name}
                            </p>
                        </label>
                        <label
                            for="category"
                            className="inventoryList__category-label">CATEGORY
                            <p
                                className="inventoryList__category"
                                name="category">{item.category}
                            </p>
                        </label>
                        <label
                            for="status"
                            className="inventoryList__status-label">STATUS
                            <p
                                className="inventoryList__status"
                                name="status">{item.status}
                            </p>
                        </label>
                        <label
                            for="qty"
                            className="inventoryList__qty-label">QTY
                            <p
                                className="inventoryList__qty"
                                name="qty">{item.quantity}
                            </p>
                        </label>
                        <label
                            for="warehouse"
                            className="inventoryList__warehouse-label">WAREHOUSE
                            <p
                                className="inventoryList__warehouse"
                                name="warehouse">{item.warehouse_name}
                            </p>
                        </label>
                        <Link to="/"><img src={DeleteButton} alt="delete-button" /></Link>
                        <Link to="/inventory/edit/"><img src={EditButton} alt="edit inventory item button" /></Link>
                    </li>
                )}
            </ul>
        </div>
    )
}