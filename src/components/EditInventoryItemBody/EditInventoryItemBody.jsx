import { useParams, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './EditInventoryItemBody.scss'
import TextFieldGroup from '../TextFieldGroup/TextFieldGroup'
import DropdownGroup from '../DropdownGroup/DropdownGroup';
import RadioGroup from "../RadioGroup/RadioGroup.jsx";
import { ITEM_CATEGORY } from "../../shared/ItemCategory.jsx";
import axios from 'axios';

export default function EditInventoryItemBody() {
    const { id } = useParams();
    const navigate = useNavigate();
    let item = {};

    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState();
    const [warehouseId, setWarehouseId] = useState();
    const [status, setStatus] = useState();
    const [quantity, setQuantity] = useState("");
    const [warehouseOptions, setWarehouseOptions] = useState({});

    // Fetched from API
    async function getInventoryItemById() {
        try {
            const response = await axios.get(`http://localhost:8080/api/inventories/${id}`);
            item = response.data;
            console.log(item);
            setItemName(item.item_name);
            setDescription(item.description);
            setCategory(item.category);
            const itemWarehouseId = getWarehouseIdByName(warehouseOptions, item.warehouse_name)
            if (itemWarehouseId > 0) {
                setWarehouseId(itemWarehouseId);
            };
            setStatus(item.status);
            setQuantity(item.quantity);
        } catch (error) {
            navigate("/NotFoundPage")
        }
    }

    async function getWarehouseOptions() {
        try {
            const response = await axios.get(`http://localhost:8080/api/warehouses`);
            console.log(response.data)

            const convertedWarehouseOptions = Object.fromEntries(
                response.data.map(warehouse => [warehouse.id, warehouse.warehouse_name])
            )
            setWarehouseOptions(convertedWarehouseOptions);
            const itemWarehouseId = getWarehouseIdByName(convertedWarehouseOptions, item.warehouse_name)
            if (itemWarehouseId > 0) {
                setWarehouseId(itemWarehouseId);
            }
        } catch (error) {
            console.error("Error Fetching warehouses", error);
        }
    }

    async function updateInventoryItem(e) {
        e.preventDefault();
        const updatedItem = {
            warehouse_id: warehouseId,
            item_name: itemName,
            description: description,
            category: category,
            status: status,
            quantity: status === "In Stock" ? Number(quantity) : 0
        };
        console.log(updatedItem)

        try {
            await axios.put(`http://localhost:8080/api/inventories/${id}`, updatedItem);
            navigate(0); // refresh page
        } catch (error) {
            console.error("Error updating inventory item", error);
            alert("Failed to update item. Please try again.");
        }
    }

    function getWarehouseIdByName(warehouseOptions, warehouseName) {
        console.log(warehouseOptions, warehouseName)
        if (!warehouseOptions || !warehouseName) {
            return -1;
        }
        const entries = Object.entries(warehouseOptions);
        console.log(entries)
        for (const [id, name] of entries) {
            if (name === warehouseName) {
                return id;
            }
        }
        return -1;
    }

    useEffect(() => {
        getWarehouseOptions();
        getInventoryItemById();
    }, [id]);

    // Options should be {value: label} pairs, where value is the key and label is the text to display
    const categoriesOptions = Object.fromEntries(
        ITEM_CATEGORY.map(category => [category, category])
    );
    const availabilityOptions = { "In Stock": "In Stock", "Out of Stock": "Out of Stock" };

    return (
        <>
        <form className="form-page" onSubmit={updateInventoryItem}>
            <div className="tablet-layout">
                <article className="item-details">
                    <div className="section-title">Item Details</div>
                    <TextFieldGroup label="Item Name" input={itemName} onChange={setItemName} />
                    <TextFieldGroup label="Description" input={description} onChange={setDescription} type = "textarea" inputClassName='description_field' />
                    <DropdownGroup label="Category" options={categoriesOptions} selected={category} onChange={setCategory} />
                </article>

                <article className="item-availability">
                    <div className="section-title">Item Availability</div>
                    <RadioGroup label="Status" options={availabilityOptions} selected={status} onChange={setStatus} />
                    {status === "In Stock" && (
                        <TextFieldGroup
                            label="Quantity"
                            input={quantity}
                            onChange={setQuantity}
                            type="number"
                            inputClassName="quantity_field"
                        />
                    )}
                    <DropdownGroup label="Warehouse" options={warehouseOptions} selected={warehouseId} onChange={setWarehouseId} />
                </article>
            </div>
            <div className="button-group">
                <button type="button" className="cancel-button" onClick={() => navigate("/inventory")}>Cancel</button>
                <button type="submit" className="save-button">Save</button>
            </div>
        </form>
        </>
    )
}