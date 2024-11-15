import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './EditInventoryItemBody.scss'
import TextFieldGroup from '../TextFieldGroup/TextFieldGroup'
import DropdownGroup from '../DropdownGroup/DropdownGroup';
import RadioGroup from "../RadioGroup/RadioGroup.jsx";
import { ITEM_CATEGORY } from "../../shared/ItemCategory.jsx";
import axios from 'axios';

export default function EditInventoryItemBody() {
    const { id } = useParams();
    let item = {};

    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState();
    const [warehouseId, setWarehouseId] = useState();
    const [status, setStatus] = useState();
    const [warehouseOptions, setWarehouseOptions] = useState({});

    // Fetched from API
    async function getInventoryItemById() {
        // const response = await axios.get(`http://localhost:5050/inventory/${id}`);
        // item = response.data;
        await new Promise(resolve => setTimeout(resolve, 200));
        item = {
            "id": 1,
            "warehouse_id": 2,
            "item_name": "Belt",
            "description": "abc",
            "category": "Electronics",
            "status": "In Stock",
            "quantity": 2000,
            "created_at": "2024-11-13 12:41:13",
            "updated_at": "2024-11-13 12:41:13"
        };
        setItemName(item.item_name);
        setDescription(item.description);
        setCategory(item.category);
        setWarehouseId(item.warehouse_id);
        setStatus(item.status);
    }

    async function getWarehouseOptions() {
        try {
            const response = await axios.get(`http://localhost:8080/api/warehouses`);
            console.log(response.data)
            setWarehouseOptions(Object.fromEntries(
                response.data.map(warehouse => [warehouse.id, warehouse.warehouse_name])
            ));
        } catch (error) {
            console.error("Error Fetching warehouses", error);
        }
    }

    useEffect(() => {
        getInventoryItemById();
        getWarehouseOptions();
    }, [id]);

    // Options should be {value: label} pairs, where value is the key and label is the text to display
    const categoriesOptions = Object.fromEntries(
        ITEM_CATEGORY.map(category => [category, category])
    );
    const availabilityOptions = { "In Stock": "In Stock", "Out of Stock": "Out of Stock" };

    return (
        <>
        <form className="form-page">
            <article className="item-details">
                <h1 className="section-title">Item Details</h1>
                <TextFieldGroup label="Item Name" input={itemName} onChange={setItemName} />
                <TextFieldGroup label="Description" input={description} onChange={setDescription} />
                <DropdownGroup label="Category" options={categoriesOptions} selected={category} onChange={setCategory} />
            </article>

            <article className="item-availability">
                <h1 className="section-title">Item Availability</h1>
                <RadioGroup label="Status" options={availabilityOptions} selected={status} onChange={setStatus} />
                <DropdownGroup label="Warehouse" options={warehouseOptions} selected={warehouseId} onChange={setWarehouseId} />
            </article>

            <div className="button-group">
                <button type="button" className="cancel-button">Cancel</button>
                <button type="submit" className="save-button">Save</button>
            </div>
        </form>
        </>
    )
}