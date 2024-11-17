import React from "react";
import InventoryItem from "../../components/InventoryItem/InventoryItem.jsx";
import "./InventoryItemDetailsPage.scss";
function InventoryItemDetailsPage() {
  return (
    <div className="inventory-item-card">
      <InventoryItem />
    </div>
  );
}

export default InventoryItemDetailsPage;
