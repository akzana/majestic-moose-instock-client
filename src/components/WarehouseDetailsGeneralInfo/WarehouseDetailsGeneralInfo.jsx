import React from 'react';

import '../WarehouseDetailsGeneralInfo/WarehouseDetailsGeneralInfo.scss';


export default function WarehouseDetailsGeneralInfo({warehouseData}) {
    return (
        <>
            <article className="WarehouseDetails__general-info">
                <div className="general-info__address">
                    <h1 className="general-info__title">WAREHOUSE ADDRESS:</h1>
                    <p className="general-info__content">
                        {warehouseData?.address || 'Address not available'}
                    </p>
                </div>
                <div className="divider"></div>
                <div className="general-info__layout">
                    <div className="general-info__contactname">
                        <h1 className="general-info__title">CONTACT NAME:</h1>
                        <p className="general-info__content">
                            {warehouseData?.contact_name || 'Name not available'}
                        </p>
                        <p className="general-info__content">
                            {warehouseData?.contact_position || 'Position not available'}
                        </p>
                    </div>
                    <div className="general-info__contactinfo">
                        <h1 className="general-info__title">CONTACT INFORMATION:</h1>
                        <p className="general-info__content">
                            {warehouseData?.contact_phone || 'Phone not available'}
                        </p>
                        <p className="general-info__content">
                            {warehouseData?.contact_email || 'Email not available'}
                        </p>
                    </div>
                </div>
            </article>
        </>
    );
}
