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
    <div className="warehouse-list">
      <div className="warehouse-list__search">
        <input type="text" placeholder="Search Warehouses" disabled />
      </div>

      <table className="warehouse-list__table">
        <thead>
          <tr>
            <th>Warehouse</th>
            <th>Address</th>
            <th>Contact Name</th>
            <th>Contact Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.warehouse_name}</td>
              <td>{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</td>
              <td>{warehouse.contact_name}</td>
              <td>
                <p>Phone: {warehouse.contact_phone}</p>
                <p>
                  Email: <a href={`mailto:${warehouse.contact_email}`}>{warehouse.contact_email}</a>
                </p>
              </td>
              <td>
                <Link to={`/warehouse/${warehouse.id}`} className="warehouse-list__link">Edit</Link>
                <button className="warehouse-list__delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseList;
