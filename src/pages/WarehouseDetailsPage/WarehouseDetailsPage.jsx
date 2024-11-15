import React from 'react'
import "./WarehouseDetailsPage.scss"
import WarehouseDetailsHeader from '../../components/WarehouseDetailsHeader/WarehouseDetailsHeader'
import WarehouseDetailsGeneralInfo from '../../components/WarehouseDetailsGeneralInfo/WarehouseDetailsGeneralInfo'



export default function WarehouseDetails(){
    return (
        <>
        <div className="warehouse_details card">
          <WarehouseDetailsHeader />
          <WarehouseDetailsGeneralInfo />
        </div>
        </>
    )
}