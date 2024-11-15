import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WarehouseList.scss";
import WarehouseHeader from "../../src/components/WarehouseHeader/WarehouseHeader";

const API_URL = "http://localhost:8080/api/warehouses";

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

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

  return (
    <div className="warehouse-card">
     
     <WarehouseHeader />

      <table className="warehouse__list">
        <thead className="warehouse__list-header">
          <tr className="warehouse__list-row">
            <th className="warehouse__list-heading">Warehouse</th>
            <th className="warehouse__list-heading">Address</th>
            <th className="warehouse__list-heading">Contact Name</th>
            <th className="warehouse__list-heading">Contact Information</th>
            <th className="warehouse__list-heading">Actions</th>
          </tr>
        </thead>
        <tbody className="warehouse__body">
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id} className="warehouse__body-row">
              <div className="warehouse__body-cols">
              <div className="warehouse__body-col1">
              <td className="warehouse__body-cell">
                <span className="warehouse__cell-header">Warehouse</span>
                <Link  to={`/warehouses/${warehouse.id}`}
                  className="warehouse__link">
                  {warehouse.warehouse_name} 
                </Link>
              </td>
              <td className="warehouse__body-cell">
                <span className="warehouse__cell-header">Address</span>
                {`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
              </td>
              </div>
              <div className="warehouse__body-col2">
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
                {" "}
                  <a
                    href={`mailto:${warehouse.contact_email}`}
                    className="warehouse__contact-email" >
                    {warehouse.contact_email}
                  </a>
                </p>
              </td>
              </div>
              </div>
              <td className="warehouse__body-cell warehouse__actions">
                
                <Link to={`/warehouse/${warehouse.id}`}
                  className="warehouse__edit" >
                  Edit
                </Link>
                <button className="warehouse__delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseList;
