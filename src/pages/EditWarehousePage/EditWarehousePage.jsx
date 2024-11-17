import React from 'react'
import EditWarehouseForm from '../../components/EditWarehouseForm/EditWarehouseForm'
import Arrow_back from '../../assets/Icons/arrow_back-24px.svg'
import { Link } from 'react-router-dom';
import './EditWarehousePage.scss'

function EditWarehouse() {
  return (
    <section className='card'>
        <div className='WarehouseAdd__header'>
            <div className="WarehouseAdd__header--layout">
                <Link to="/warehouses">
                    <img className="arrow_back" src={Arrow_back} alt="Arrow pointing left" />
                </Link>
                <h1 className="WarehouseAdd__title">
                    Edit Warehouse
                </h1>
            </div>
        </div>  
    <div><EditWarehouseForm/></div>
    </section>
  )
}

export default EditWarehouse