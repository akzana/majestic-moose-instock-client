import React from 'react'
import '../WarehouseDetailsGeneralInfo/WarehouseDetailsGeneralInfo.scss'

export default function WarehouseDetailsGeneralInfo() {
    return (
        <>
            <article className="WarehouseDetails__general-info">
                <div className="general-info__address">
                    <h1 className="general-info__title">WAREHOUSE ADDRESS:</h1>
                    <p className="general-info__content">33 Pearl Streert SW, Washington, USA</p>
                </div>
                <div className="divider"></div>
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