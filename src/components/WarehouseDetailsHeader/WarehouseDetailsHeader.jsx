import React from 'react'
import Arrow_back from '../../assets/Icons/arrow_back-24px.svg'
import Edit_white from '../../assets/Icons/edit-white-24px.svg'
// import "./WarehouseDetailsHeader.scss"
import '../WarehouseDetailsHeader/WarehouseDetailsHeader.scss'
import { Link } from 'react-router-dom'

export default function WarehouseDetailsHeader(){
    return (
        <>
        <div className='WarehouseDetails__header'>
            <div className="WarehouseDetails__header--layout">
            <Link to="/warehouse">
                <img className="arrow_back" src={Arrow_back} alt="back to warehouse page" />
            </Link>
            <h1 className="WarehouseDetails__title">
                Washington
            </h1>
            </div>
            <Link to="/warehouse/edit" className="edit_white-container">
                <img className="edit_white" src={Edit_white} alt="go to edit warehouse page" />
            </Link>
            <Link to="/warehouse/edit" className="edit_white-container edit_button">
                <img className="edit_white" src={Edit_white} alt="go to edit warehouse page" />
                <span className="edit_text">Edit</span>
            </Link>
        </div>        
        </>
        )
    }