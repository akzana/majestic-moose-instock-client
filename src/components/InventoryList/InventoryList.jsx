import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import sortIcon from "../../assets/Icons/sort-24px.svg";
import rightAarrowIcon from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import DeleteModalInventoryItem from "../DeleteModalInventoryItem/DeleteModalInventoryItem";
import "./InventoryList.scss";
const baseURL = import.meta.env.VITE_URL;

export default function InventoryList() {
  // conditional for warehouse.id
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { id } = useParams();

  const getInventory = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/inventories`);

      if (id) {
        const filteredInventory = response.data?.filter(
          (inventoryItem) => id == inventoryItem.warehouseId
        );
        setInventory(filteredInventory);
      } else {
        setInventory(response.data);
      }
    } catch (err) {
      console.error("Error retrieving inventory items", err);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    console.log(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Selected Item:", selectedItem);
      const response = await axios.delete(`${baseURL}/api/inventories/${selectedItem.id}`);
      if (response.ok) {
        useEffect (()=>{
          setInventory(inventory.filter((item) => item.id !== selectedItem.id));
          handleCloseModal();
        }, [])
      }
      
      console.log(`Deleting item with ID: ${selectedItem.id}`);
    } catch (err) {
      console.error("Error deleting inventory item:", err);
    }
  };

    return (
        <div>
            <table className="inventoryList">
                <thead className="inventory__list-header">
                    <tr className="inventory__list-row">
                        <th className="inventory__list-heading">
                            Inventory Item
                            <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
                        </th>
                        <th className="inventory__list-heading">
                            category
                            <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
                        </th>
                        <th className="inventory__list-heading">
                            Status
                            <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
                        </th>
                        <th className="inventory__list-heading">
                            QTY
                            <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
                        </th>
                        <th className="inventory__list-heading">
                            warehouse
                            <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
                        </th>
                        <th className="inventory__list-heading inventory__list-heading-actions">Actions</th>
                    </tr>
                </thead>
                <tbody className="inventory__body">
                    {inventory.map((inventory) => (
                        <tr key={inventory.inventoryItemId} className="inventory__body-row">
                            <td className="inventory__body-cell">
                                <span className="inventory__cell-header">inventory item</span>
                                <Link
                                    to={`/inventory/${inventory.inventoryItemId}`}
                                    className="inventory__link" >
                                    {inventory.item_name}
                                    <img
                                        src={rightAarrowIcon}
                                        alt="Right arrow Icon"
                                        className="rightarrow__icon" />
                                </Link>
                            </td>

                            <td className="inventory__body-cell">
                                <span className="inventory__cell-header">Category</span>
                                {inventory.category}
                            </td>


                            <td className="inventory__body-cell">
                                <span className="inventory__cell-header">status</span>
                                {inventory.status}
                            </td>

                            <td className="inventory__body-cell">
                                <span className="inventory__cell-header">
                                    qty
                                </span>
                                <p className="inventory__qty">
                                    {inventory.quantity}
                                </p>
                            </td>

                                <td className="inventory__body-cell warehouse">
                                    <span className="inventory__cell-header">
                                        Warehouse
                                    </span>
                                    <p className="inventory__warehouse">
                                        {inventory.warehouse_name}
                                    </p>

                                </td>

                            <td className="inventory__body-cell inventory__actions">
                                <button
                                    className="inventory__delete"
                                    onClick={() => handleDeleteClick(inventory)}>
                                    <img
                                        src={deleteIcon}
                                        alt="Delete Icon"
                                        className="delete__icon"
                                    />
                                </button>
                                <Link
                                    to={`/warehouse/${inventory.warehouse_id}`}
                                    className="warehouse__edit">
                                    <img
                                        src={editIcon}
                                        alt="Edit Icon"
                                        className="edit__icon" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteModalInventoryItem
          itemName={selectedItem?.item_name}
          show={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
        </div>
    )
}
