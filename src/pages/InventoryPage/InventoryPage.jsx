import React from 'react';
import "./InventoryPage.scss"
import InventoryHeader from '../../components/InventoryHeader/InventoryHeader';
import InventoryList from '../../components/InventoryList/InventoryList';

export default function InventoryPage() {
  return (
    <div className='component'>
      <InventoryHeader />
      <InventoryList />
    </div>
  )
}
