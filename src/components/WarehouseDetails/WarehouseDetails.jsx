import Arrow_back from '../../assets/Icons/arrow_back-24px.svg'
import Edit_white from '../../assets/Icons/edit-white-24px.svg'
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
        </>
    )
}