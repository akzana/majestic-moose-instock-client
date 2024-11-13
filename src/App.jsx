import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import WarehouseList from "../pages/WarehouseList/WarehouseList";
import WarehouseDetails from "../pages/WarehouseDetails/WarehouseDetails";
import AddWarehouse from "../pages/AddWarehouse/AddWarehouse";
import EditWarehouse from "../pages/EditWarehouse/EditWarehouse";
import Inventory from "../pages/InventoryList/InventoryList";
import InventoryItem from "../pages/InventoryItemDetails/InventoryItemDetails";
import AddInventoryItem from "../pages/AddInventoryItem/AddInventoryItem";
import EditInventoryItem from "../pages/EditInventoryItem/EditInventoryItem";

function App() {

  return (
    <>
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WarehouseList />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/:id" element={<WarehouseDetails />} />
        <Route path="/warehouses/add" element={<AddWarehouse />} />
        <Route path="/warehouses/edit/:id" element={<EditWarehouse />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/:id" element={<InventoryItem />} />
        <Route path="/inventory/add" element={<AddInventoryItem/>} />
        <Route path="/inventory/edit/:id" element={<EditInventoryItem />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
