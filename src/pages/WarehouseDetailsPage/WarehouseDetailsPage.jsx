import React from 'react'
import "./WarehouseDetailsPage.scss"
import WarehouseDetailsHeader from '../../components/WarehouseDetailsHeader/WarehouseDetailsHeader'
import WarehouseDetailsGeneralInfo from '../../components/WarehouseDetailsGeneralInfo/WarehouseDetailsGeneralInfo'
import InventoryList from '../../components/InventoryList/InventoryList'



export default function WarehouseDetails(){
    return (
        <>
        <div className="warehouse_details card">
          <WarehouseDetailsHeader />
          <WarehouseDetailsGeneralInfo />
          <InventoryList />
        </div>
        </>
    )
}