import React from "react";
import "./DeleteModalInventoryItem.scss";
import closeIcon from "../../assets/Icons/close-24px.svg";

const DeleteModalInventoryItem = ({ itemName, show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
          <div className="modal-button modal-button--close" onClick={onClose}>
            <img src={closeIcon} alt="Close Icon" className="close__icon" />
          </div>
          <h2>Delete {itemName} item?</h2>
          <p>
            Please confirm that you’d like to delete {itemName} from the
            inventory list. You won’t be able to undo this action.
          </p>
        </div>
        <div className="modal-actions">
          <button
            className="modal-button modal-button--cancel"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-button modal-button--confirm"
            onClick={onConfirm && onClose} >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalInventoryItem;
