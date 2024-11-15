import React from 'react';
import "./InventoryPage.scss"
import InventoryHeader from '../../src/components/InventoryHeader/InventoryHeader';
import InventoryList from '../../src/components/InventoryList/InventoryList';

export default function InventoryPage() {
  return (
    <div className='component'>
      <InventoryHeader />
      <InventoryList />
    </div>
  )
}
