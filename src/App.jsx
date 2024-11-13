import './App.css'
import Footer from './components/footer/footer'
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <WarehouseDetails />
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
