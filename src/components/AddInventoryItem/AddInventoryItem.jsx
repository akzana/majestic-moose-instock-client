import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../assets/Icons/error-24px.svg";
import "./AddInventoryItem.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_URL;

function AddInventoryItem() {
  const [warehouses, setWarehouses] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  // Api calls to get correct data for dropdown selects
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

  const uniqueCategories = new Set(inventoryItems.map((item) => item.category));

  // FORM FUNCTIONS
  const [formData, setFormData] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: 0,
  });

  const [errorState, setErrorState] = useState({
    warehouse_id: false,
    item_name: false,
    description: false,
    category: false,
    status: false,
    quantity: false,
  });

  const validateForm = () => {
    let isValid = true;
    for (const [name, value] of Object.entries(formData)) {
      if (typeof value === "string" && value.trim() === "") {
        setErrorState((prevState) => ({ ...prevState, [name]: true }));
        isValid = false;
      }
      if (isNaN(formData.warehouse_id)) {
        setErrorState((prevState) => ({ ...prevState, warehouse_id: true }));
        isValid = false;
      }
      if (formData.category === "Please Select") {
        setErrorState((prevState) => ({ ...prevState, category: false }));
        isValid = false;
      }
    }
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setErrorState({ ...errorState, [name]: false });

    if (name === "status") {
      // If status is Out of Stock, we need to set quantity to zero.
      if (value === "Out of Stock") {
        setFormData((prevData) => ({
          ...prevData,
          status: value,
          quantity: 0,
        }));
      } else {
        // if item is in stock, use what the user enters.
        setFormData((prevData) => ({
          ...prevData,
          status: value,
        }));
      }
      return;
    }

    // if status isn't changed, make sure quantity and warehouse_id are being parsed as integers.
    if (name === "quantity" || name === "warehouse_id") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "" ? "" : parseInt(value) || "",
      }));
      return;
    }

    // for all other fields, update normally.
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateForm();
    if (!valid) {
      console.log("Please fix errors");
      console.log(errorState);
    } else {
      console.log(formData);
    }
  };

  return (
    <section className="add-new-item">
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
          <label htmlFor="itemName" className="item-details__form-label">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="item_name"
            placeholder="Item Name"
            value={formData.item_name}
            onChange={handleChange}
          />
          {errorState.item_name && (
            <p className="error-message">
              <img src={errorIcon} alt="error icon" className="error-icon" />{" "}
              This field is required
            </p>
          )}
          <label htmlFor="itemDescription" className="item-details__form-label">
            Item Description{" "}
          </label>
          <textarea
            name="description"
            id="itemDescription"
            placeholder="Please enter a brief item description..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errorState.description && (
            <p className="error-message">
              <img src={errorIcon} alt="error icon" className="error-icon" />{" "}
              This field is required
            </p>
          )}
          <label htmlFor="category" className="item-details__form-label">
            Category{" "}
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Please Select</option>
            {[...uniqueCategories].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>{" "}
          {errorState.category && (
            <p className="error-message">
              <img src={errorIcon} alt="error icon" className="error-icon" />{" "}
              This field is required
            </p>
          )}
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
            <label htmlFor="quantity"></label>
            Quantity
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              disabled={formData.status === "Out of Stock"}
            />
            {errorState.quantity && (
              <p className="error-message">
                <img src={errorIcon} alt="error icon" className="error-icon" />{" "}
                This field is required
              </p>
            )}
          </div>
          <label htmlFor="warehouse">Warehouse </label>
          <select
            name="warehouse_id"
            id="warehouse"
            value={formData.warehouse_id}
            onChange={handleChange}
          >
            <option>Please Select</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.warehouse_name}
              </option>
            ))}
          </select>{" "}
          {errorState.warehouse_id && (
            <p className="error-message">
              <img src={errorIcon} alt="error icon" className="error-icon" />{" "}
              This field is required
            </p>
          )}
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
