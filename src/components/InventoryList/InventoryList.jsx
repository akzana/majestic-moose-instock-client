import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteButton from "../../assets/Icons/delete_outline-24px.svg";
import EditButton from "../../assets/Icons/edit-24px.svg";
import DeleteModalInventoryItem from "../DeleteModalInventoryItem/DeleteModalInventoryItem";
import axios from "axios";
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
  }, [id]);

  // Function to handle the delete button click
  const handleDeleteClick = (inventoryItem) => {
    setSelectedItem(inventoryItem);
    setShowModal(true);
  };

  // Function to close the delete modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // Function to confirm and delete the inventory item
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${baseURL}/api/inventories/${selectedItem.id}`);
      setInventory(inventory.filter((item) => item.id !== selectedItem.id));
      setShowModal(false);
      setSelectedItem(null);
    } catch (err) {
      console.error("Error deleting inventory item", err);
    }
  };
  
  


  return (
    <div>
      <ul className="inventoryList">
      <DeleteModalInventoryItem
              itemName={selectedItem?.item_name}
              show={showModal}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}/>

        {inventory.map((item) => (
          <li className="inventoryList__item" key={item.id}>
            <label for="item-name" className="inventoryList__item-label">
              INVENTORY ITEM
              <p className="inventoryList__item-name" name="item-name">
                {item.item_name}
              </p>
            </label>
            <label for="category" className="inventoryList__category-label">
              CATEGORY
              <p className="inventoryList__category" name="category">
                {item.category}
              </p>
            </label>
            <label for="status" className="inventoryList__status-label">
              STATUS
              <p className="inventoryList__status" name="status">
                {item.status}
              </p>
            </label>
            <label for="qty" className="inventoryList__qty-label">
              QTY
              <p className="inventoryList__qty" name="qty">
                {item.quantity}
              </p>
            </label>
            <label for="warehouse" className="inventoryList__warehouse-label">
              WAREHOUSE
              <p className="inventoryList__warehouse" name="warehouse">
                {item.warehouse_name}
              </p>
            </label>
            <button
              className="inventory__delete"
              onClick={() => handleDeleteClick(item)}>
              <img
                src={DeleteButton}
                alt="Delete Icon"
                className="delete__icon"
              />
            </button>

            <Link to="/inventory/edit/">
              <img src={EditButton} alt="edit inventory item button" />
            </Link>

          
          </li>
        ))}
      </ul>
    </div>
  );
}
