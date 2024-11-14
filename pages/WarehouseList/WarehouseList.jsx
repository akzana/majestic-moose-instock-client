import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WarehouseList.scss';

const API_URL = 'http://localhost:8080/api/warehouses';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };
    fetchWarehouses();
  }, []);

  return (
    <div className="warehouse__list">
      <div className="warehouse__search">
        <input
          type="text"
          className="warehouse__search-input"
          placeholder="Search Warehouses"
          disabled
        />
      </div>

      <table className="warehouse__table">
        <thead className="warehouse__table-header">
          <tr className="warehouse__table-row">
            <th className="warehouse__table-heading">Warehouse</th>
            <th className="warehouse__table-heading">Address</th>
            <th className="warehouse__table-heading">Contact Name</th>
            <th className="warehouse__table-heading">Contact Information</th>
            <th className="warehouse__table-heading">Actions</th>
          </tr>
        </thead>
        <tbody className="warehouse__body">
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id} className="warehouse-list__body-row">
              <td className="warehouse__body-cell">{warehouse.warehouse_name}</td>
              <td className="warehouse__body-cell">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</td>
              <td className="warehouse__body-cell">{warehouse.contact_name}</td>
              <td className="warehouse__body-cell">
                <p className="warehouse__contact">
                  Phone: {warehouse.contact_phone}
                </p>
                <p className="warehouse__contact-info">
                  Email: <a href={`mailto:${warehouse.contact_email}`} className="warehouse__contact-email">{warehouse.contact_email}</a>
                </p>
              </td>
              <td className="warehouse__body-cell warehouse__actions">
                <Link to={`/warehouse/${warehouse.id}`} className="warehouse__edit">Edit</Link>
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
