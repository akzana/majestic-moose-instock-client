import React, { useState, useEffect } from 'react'
import "./WarehouseDetailsPage.scss"
import WarehouseDetailsHeader from '../../components/WarehouseDetailsHeader/WarehouseDetailsHeader'
import WarehouseDetailsGeneralInfo from '../../components/WarehouseDetailsGeneralInfo/WarehouseDetailsGeneralInfo'
import InventoryList from '../../components/InventoryList/InventoryList'
import axios from "axios"
import { useParams } from 'react-router-dom';


export default function WarehouseDetails(){
    const { id } = useParams()
    const [warehouseData, setWarehouseData] = useState(null);

    const fetchWarehouseDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/warehouses/${id}`);
            setWarehouseData(response.data[0]);  // TODO: should not return array of data
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchWarehouseDetails();
    }, [id]);

    return (
        <>
        <div className="warehouse_details card">
          <WarehouseDetailsHeader warehouseName={warehouseData?.warehouse_name} id={id}/>
          <WarehouseDetailsGeneralInfo warehouseData={warehouseData}/>
          <InventoryList />
        </div>
        </>
    )
}