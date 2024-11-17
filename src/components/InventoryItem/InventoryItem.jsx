import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./InventoryItem.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-white-24px.svg";
import axios from "axios";
const baseURL = import.meta.env.VITE_URL;

function InventoryItem() {
  const { id } = useParams();
  const [itemData, setItemData] = useState([]);

  const getItem = async (itemId) => {
    try {
      const response = await axios.get(`${baseURL}/api/inventories/${itemId}`);
      setItemData(response.data);
    } catch (err) {
      console.error("Error fetching item:", err);
    }
  };

  useEffect(() => {
    getItem(id);
  }, []);

  return (
    <section className="item-details">
      <div className="item-details__header">
        <Link to="/inventory">
          <img
            className="item-details__back-icon"
            alt="go back arrow icon"
            src={backArrow}
          />
        </Link>
        <h1 className="item-details__title">{itemData.item_name}</h1>
        <Link
          to={`/inventory/edit/${id}`}
          className="item-details__icon-container"
        >
          <img
            className="item-details__edit-icon"
            src={editIcon}
            alt="edit icon"
          />{" "}
          <span className="item-details__edit">Edit</span>
        </Link>
      </div>
      <article className="item-details__content">
        <div className="item-details__description-group">
          <h4 className="item-details__label">Item Description:</h4>
          <p className="item-details__description">{itemData.description}</p>
          <h4 className="item-details__label">Category:</h4>
          <p className="item-details__category">{itemData.category}</p>
        </div>
        <div className="item-details__status-group">
          <div className="item-details__status-quantity-container">
            <div className="item-details__status-container">
              <h4 className="item-details__label">Status:</h4>
              <p
                className={
                  itemData.status === "In Stock"
                    ? "item-details__tag--in-stock"
                    : "item-details__tag--out-of-stock"
                }
              >
                {itemData.status}
              </p>
            </div>
            <div className="item-details__quantity-container">
              <h4 className="item-details__label">Quantity:</h4>
              <p className="item-details__quantity">{itemData.quantity}</p>
            </div>
          </div>
          <h4 className="item-details__label">Warehouse:</h4>
          <p className="item-details__warehouse">{itemData.warehouse_name}</p>
        </div>
      </article>
    </section>
  );
}

export default InventoryItem;
