import React from 'react'
import Arrow_back from '../../src/assets/Icons/arrow_back-24px.svg'
import Edit_white from '../../src/assets/Icons/edit-white-24px.svg'
import "./WarehouseDetails.scss"
import { Link } from 'react-router-dom'

export default function WarehouseDetails(){
    return (
        <>
        <div className='WarehouseDetails__header'>
            <Link to="/warehouse" className="no-underline">
                <img className="arrow_back" src={Arrow_back} alt="back to warehouse page" />
            </Link>
            <h1 className="WarehouseDetails__title">
                Washington
            </h1>
            <Link to="/warehouse/edit" className="no-underline">
                <img className="edit_white" src={Edit_white} alt="go to edit warehouse page" />
            </Link>
        </div>

        <article className="WarehouseDetails__general-info">
          <div className="general-info__address">
            <h1 className="general-info__title">WAREHOUSE ADDRESS:</h1>
            <p className="general-info__content">33 Pearl Streert SW, Washington, USA</p>
          </div>
          <div className="general-info__layout">
            <div className="general-info__contactname">
              <h1 className="general-info__title">CONTACT NAME:</h1>
              <p className="general-info__content">Graeme Lyon</p>
              <p className="general-info__content">Warehouse Manager</p>
            </div>
            <div className="general-info__contactinfo">
              <h1 className="general-info__title">CONTACT INFORMATION:</h1>
              <p className="general-info__content">+1(647)504-0911</p>
              <p className="general-info__content">glyon@instock.com</p>
            </div>
          </div>
        </article>

        </>
    )
}