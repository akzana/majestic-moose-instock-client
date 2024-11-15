import React from 'react'
import AddWarehouseForm from '../../src/components/AddWarehouseForm/AddWarehouseForm'
import backArrow from "../../src/assets/Icons/arrow_back-24px.svg"
import { Link } from 'react-router-dom';

function AddWarehouse() {
  return (
    <section className='card'>
        <Link to="/" >
        <img src={backArrow} alt='Arrow pointing left' >
        </img>
        </Link>
        <h1>Add New Warehouse</h1>
    <div><AddWarehouseForm/></div>
    </section>
  )
}

export default AddWarehouse