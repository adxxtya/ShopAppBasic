import './App.css'
import Navbar from "../components/Navbar/Navbar"
import ShopForm from "../components/ShopForm/ShopForm"
import Cards from "../components/Cards/Cards"
import { useState } from 'react'

function App() {

  const [openForm, setOpenForm] = useState(false)

  return (
    <div>
        <Navbar setOpenForm={setOpenForm} />
        {openForm && <ShopForm setOpenForm={setOpenForm} />}
        <Cards />
    </div>
  )
}

export default App
