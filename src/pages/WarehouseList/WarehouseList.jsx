import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WarehouseList.scss";
import WarehouseHeader from "../../components/WarehouseHeader/WarehouseHeader";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import rightAarrowIcon from "../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

const API_URL = "http://localhost:8080/api/warehouses";


const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };
    fetchWarehouses();
  }, []);

  const handleDeleteClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWarehouse(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${selectedWarehouse.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setWarehouses(warehouses.filter((w) => w.id !== selectedWarehouse.id));
        handleCloseModal();
      } else {
        console.error("Failed to delete warehouse");
      }
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  return (
    <div className="warehouse-card">
      <DeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <WarehouseHeader />

      <table className="warehouse__list">
        <thead className="warehouse__list-header">
          <tr className="warehouse__list-row">
            <th className="warehouse__list-heading">
              Warehouse
              <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
            </th>
            <th className="warehouse__list-heading">
              Address
              <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
            </th>
            <th className="warehouse__list-heading">
              Contact Name
              <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
            </th>
            <th className="warehouse__list-heading">
              Contact Information
              <img src={sortIcon} alt="Sort Icon" className="sort__icon" />
            </th>
            <th className="warehouse__list-heading warehouse__list-heading-actions">Actions</th>
          </tr>
        </thead>
        <tbody className="warehouse__body">
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id} className="warehouse__body-row">
          
              <td className="warehouse__body-cell">
                <span className="warehouse__cell-header">Warehouse</span>
                <Link
                  to={`/warehouses/${warehouse.id}`}
                  className="warehouse__link" >
                  {warehouse.warehouse_name}
                  <img
                    src={rightAarrowIcon}
                    alt="Right arrow Icon"
                    className="rightarrow__icon"/>
                </Link>
                </td>
        
                  <td className="warehouse__body-cell">
                    <span className="warehouse__cell-header">Address</span>
                    {`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
                  </td>
                  
                
                  <td className="warehouse__body-cell">
                    <span className="warehouse__cell-header">Contact Name</span>
                    {warehouse.contact_name}
                  </td>

                  <td className="warehouse__body-cell">
                    <span className="warehouse__cell-header">
                      Contact Information
                    </span>
                    <p className="warehouse__contact">
                      {warehouse.contact_phone}
                    </p>
                    <p className="warehouse__contact-info">
                      <a
                        href={`mailto:${warehouse.contact_email}`}
                        className="warehouse__contact-email">
                        {warehouse.contact_email}
                      </a>
                    </p>
                  </td>
                  
              <td className="warehouse__body-cell warehouse__actions">
                <button
                  className="warehouse__delete"
                  onClick={() => handleDeleteClick(warehouse)}>
                  <img
                    src={deleteIcon}
                    alt="Delete Icon"
                    className="delete__icon"
                  />
                </button>
                <Link
                  to={`/warehouse/${warehouse.id}`}
                  className="warehouse__edit">
                  <img src={editIcon} alt="Edit Icon" className="edit__icon" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseList;
