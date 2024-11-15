import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import "./AddInvItem.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_URL;

function AddInvItem() {
  const [warehouses, setWarehouses] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  const getWarehouses = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/warehouses`);
      setWarehouses(response.data);
    } catch (err) {
      console.error("Error fetching warehouses:", err);
    }
  };

  const getInventoryItems = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/inventories`);
      setInventoryItems(response.data);
    } catch (err) {
      console.error("Error fetching inventory items", err);
    }
  };

  useEffect(() => {
    getWarehouses();
    getInventoryItems();
  }, []);

  const categories = inventoryItems.map((item) => item.category);
  const uniqueCategories = new Set(categories);
  return (
    <section>
      <div className="add-new-item__header">
        <Link to="/inventory">
          <img
            src={arrowBack}
            alt="go back arrow icon"
            className="add-new-item__back-icon"
          />
        </Link>
        <h1 className="add-new-item__title">Add New Inventory Item</h1>
      </div>
      <form>
        <div className="item-details">
          <h2 className="item-details__title">Item Details</h2>
          <label htmlFor="itemName">
            Item Name
            <input type="text" placeholder="Item Name" id="itemName" />
          </label>
          <label htmlFor="itemDescription">
            Item Description
            <textarea
              name="itemDescription"
              id="itemDescription"
              placeholder="Please enter a brief item description..."
            ></textarea>
          </label>
          <label htmlFor="category">
            Category
            <select name="category" id="category">
              {[...uniqueCategories].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="item-availability">
          <h2 className="item-availability__title">Item Availability</h2>
          <h3>Status </h3>
          <input type="radio" name="status" id="status" />
          <label>In Stock</label>
          <input type="radio" name="status" id="status" />
          <label>Out of Stock</label>
          <label>
            Quantity
            <input type="number" name="quantity" id="quantity" />
          </label>
          <label htmlFor="">
            Warehouse
            <select name="warehouse" id="warehouse">
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="buttons">
          <button className="cancel-button" type="button">
            Cancel
          </button>
          <button className="add-item-button" type="button">
            + Add Item
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddInvItem;
