import React from "react";
import "./DeleteModal.scss";

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Please confirm that you’d like to delete the Washington from the list of warehouses. You won’t be able to undo this action.</p>
        <div className="modal-actions">
          <button className="modal-button modal-button--cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button modal-button--confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
