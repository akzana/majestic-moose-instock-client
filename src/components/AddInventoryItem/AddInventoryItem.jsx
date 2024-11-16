import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import "./AddInventoryItem.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_URL;

function AddInventoryItem() {
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

  const [formData, setFormData] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "quantity" || name === "warehouse_id"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalData = {
      ...formData,
      warehouse_id: parseInt(formData.warehouse_id),
      quantity: isNaN(formData.quantity) ? 0 : formData.quantity,
    };
    console.log(finalData);
  };
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
      <form onSubmit={handleSubmit}>
        <div className="item-details">
          <h2 className="item-details__title">Item Details</h2>
          <label htmlFor="itemName">Item Name </label>
          <input
            type="text"
            placeholder="Item Name"
            id="itemName"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
          />

          <label htmlFor="itemDescription">Item Description </label>
          <textarea
            name="description"
            id="itemDescription"
            placeholder="Please enter a brief item description..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="category">Category </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            {[...uniqueCategories].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="item-availability">
          <h2 className="item-availability__title">Item Availability</h2>
          <label>Status </label>
          <label>
            <input
              type="radio"
              value="In Stock"
              name="status"
              checked={formData.status === "In Stock"}
              onChange={handleChange}
            />
            In Stock
          </label>
          <label>
            <input
              type="radio"
              value="Out of Stock"
              name="status"
              checked={formData.status === "Out of Stock"}
              onChange={handleChange}
            />
            Out of Stock
          </label>
          <div
            className={
              formData.status === "Out of Stock"
                ? "item-availability__quantity-hidden"
                : "item-availability__quantity-visible"
            }
          >
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="warehouse">Warehouse </label>
          <select
            name="warehouse_id"
            id="warehouse"
            value={formData.warehouse_id}
            onChange={handleChange}
          >
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.warehouse_name}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <Link to="/inventory">
            <button className="cancel-button" type="button">
              Cancel
            </button>
          </Link>
          <button className="add-item-button" type="submit">
            + Add Item
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddInventoryItem;
