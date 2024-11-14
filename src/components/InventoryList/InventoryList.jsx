import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from "../../assets/Icons/delete_outline-24px.svg";
import EditButton from "../../assets/Icons/edit-24px.svg"
import axios from 'axios';

export default function InventoryList() {
    // conditional for warehouse.id
    //axios to server
    const [inventory, setInventory] = useState([]);
    
    const getInventory = async () => {
        try{
            const response = await axios.get()
            setInventory(response)
        } catch(err) {
            console.error("Error retrieving inventory items", err);
            
        }
    }
    return (
        <div>
            <ul className="inventoryList">
                <li className="inventoryList__item">
                    <p className="inventoryList__label">INVENTORY ITEM</p>
                    <p className="inventoryList__item-title">Television</p>
                    <p className="inventoryList__category-label">CATEGORY</p>
                    <p className="inventoryList__category">Electronics</p>
                    <p className="inventoryList__status-label">STATUS</p>
                    <p className="inventoryList__status">IN STOCK</p>
                    <p className="inventoryList__qty-label">QTY</p>
                    <p className="inventoryList__qty">500</p>
                    <p className="inventoryList__warehouse-label">WAREHOUSE</p>
                    <p className="inventoryList__warehouse">Manhattan</p>
                    <Link to="/"><img src={DeleteButton} alt="delete-button" /></Link>
                    <Link><img src={EditButton} alt="" /></Link>
                </li>
            </ul>
        </div>
    )
}
