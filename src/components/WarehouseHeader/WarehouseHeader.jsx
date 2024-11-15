import React from "react";
import { Link } from "react-router-dom";
import "./WarehouseHeader.scss";
import searchIcon from "../../assets/Icons/search-24px.svg";

function WarehouseHeader() {
  return (
    <div className="warehouse">
      <h2 className="warehouse__title">Warehouses</h2>
      <div className="warehouse__controls">
        <div className="warehouse__search">
          <input
            type="text"
            className="warehouse__input"
            placeholder="Search..."
            disabled
          />
          <img src={searchIcon} alt="Search Icon" className="warehouse__icon" />
        </div>

        <Link
          to="/warehouses/add"
          className="warehouse__add-button primary-button" >
          + Add New Warehouse
        </Link>
      </div>
    </div>
  );
}

export default WarehouseHeader;
