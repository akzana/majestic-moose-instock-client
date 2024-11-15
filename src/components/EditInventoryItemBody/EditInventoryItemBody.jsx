import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './EditInventoryItemBody.scss'
import TextFieldGroup from '../TextFieldGroup/TextFieldGroup'
import DropdownGroup from '../DropdownGroup/DropdownGroup';
import RadioGroup from "../RadioGroup/RadioGroup.jsx";
import axios from 'axios';

export default function EditInventoryItemBody() {
    const { id } = useParams();

    // Fetched from API
    const item = {
        "id": 1,
        "warehouse_id": 1,
        "item_name": "Belt",
        "description": "abc",
        "category": "Accessories",
        "status": "In Stock",
        "quantity": 2000,
        "created_at": "2024-11-13 12:41:13",
        "updated_at": "2024-11-13 12:41:13"
    }; // axios.get(`http://localhost:5050/inventory/${id}`)
    const categoriesOptions = {
        "Accessories": "Accessories",
        "Apparel": "Apparel",
        "Electronics": "Electronics",
        "Food": "Food",
        "Health": "Health",
        "Home": "Home",
        "Outdoor": "Outdoor"
    }
    const warehousesOptions = {
        1: "Warehouse A",
        2: "Warehouse B",
        3: "Warehouse C",
        4: "Warehouse D",
        5: "Warehouse E",
        6: "Warehouse F",
        7: "Warehouse G",
        8: "Warehouse H",
        9: "Warehouse I",
        10: "Warehouse J"
    }
    const availabilityOptions = { "In Stock": "In Stock", "Out of Stock": "Out of Stock" };


    const [itemName, setItemName] = useState(item.item_name);
    const [description, setDescription] = useState(item.description);
    const [category, setCategory] = useState(item.category);
    const [warehouseId, setWarehouseId] = useState(item.warehouse_id);
    const [status, setStatus] = useState(item.status);

    console.log(itemName, description, category, warehouseId, status);

    return (
        <>
        <form>
            <article className="item_details">
                <h1 className="section_title">Item Details</h1>
                <TextFieldGroup label="Item Name" input={itemName} onChange={setItemName} />
                <TextFieldGroup label="Description" input={description} onChange={setDescription} />

                <DropdownGroup label="Category" options={categoriesOptions} selected={category} onChange={setCategory}/>
            </article>

            <article className="item_availability">
                <h1 className="section_title">Item Availability</h1>
                <RadioGroup label="Status" options={availabilityOptions} selected={status} onChange={setStatus} />
                <DropdownGroup label="Warehouse" options={warehousesOptions} selected={warehouseId} onChange={setWarehouseId}/>
            </article>
        </form>
        </>
    )
}