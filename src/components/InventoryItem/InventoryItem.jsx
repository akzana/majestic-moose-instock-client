import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./InventoryItem.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-white-24px.svg";
import axios from "axios";
const baseURL = import.meta.env.VITE_URL;

function InventoryItemDetails() {
  const { id } = useParams();
  const [itemData, setItemData] = useState([]);

  const getItem = async (itemId) => {
    try {
      const response = await axios.get(`${baseURL}/api/inventories/${itemId}`);
      setItemData(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching item:", err);
    }
  };

  useEffect(() => {
    getItem(id);
  }, []);

  return (
    <div className="item-details">
      <div className="item-details__header">
        <Link to="/inventory">
          <img
            className="item-details__icon"
            alt="back arrow"
            src={backArrow}
          />
        </Link>
        <h1 className="item-details__title">{itemData.item_name}</h1>
        <Link
          to="/inventory/edit/{id}"
          className="item-details__icon-container"
        >
          <img
            className="item-details__icon"
            src={editIcon}
            alt="go to edit warehouse page"
          />
        </Link>
      </div>
      <div className="item-details__container">
        <p className="item-details__title">Item Description</p>
        <p className="item-details__description">{itemData.description}</p>
        <p className="item-details__title">Category</p>
        <p className="item-details__category">{itemData.category}</p>
        <p className="item-details__title">Status:</p>
        <p className="item-details__tag">{itemData.status}</p>
        <p className="item-details__title">Quantity</p>
        <p className="item-details__quantity">{itemData.quantity}</p>
        <p className="item-details__title">Warehouse</p>
        <p className="item-details__warehouse">{itemData.warehouse_name}</p>
      </div>
    </div>
  );
}

export default InventoryItemDetails;
