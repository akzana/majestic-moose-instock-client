import React from 'react'
import AddWarehouseForm from '../../src/components/AddWarehouseForm/AddWarehouseForm'
import Arrow_back from '../../src/assets/Icons/arrow_back-24px.svg'
import { Link } from 'react-router-dom';
import './AddWarehouse.scss'

function AddWarehouse() {
  return (
    <section className='card'>
        <div className='WarehouseAdd__header'>
            <div className="WarehouseAdd__header--layout">
                <Link to="/warehouse">
                    <img className="arrow_back" src={Arrow_back} alt="Arrow pointing left" />
                </Link>
                <h1 className="WarehouseAdd__title">
                    Add New Warehouse
                </h1>
            </div>
        </div>  
    <div><AddWarehouseForm/></div>
    </section>
  )
}

export default AddWarehouse