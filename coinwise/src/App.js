import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import 'boxicons/css/boxicons.min.css';
import Cryptocurrencies from './Pages/Cryptocurrencies/Cryptocurrencies'
import CryptoDetails from './Pages/CryptoDetails/CryptoDetails'
import CryptoContextProvider from './Context/CryptoContext'

const App = () => {
  const [menu, setMenu] = useState('Home');

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='h-[100vh] w-full bg-white' id='main'>
      <div>
        <CryptoContextProvider>
          <BrowserRouter>
            <Header showMenu={showMenu} setShowMenu={setShowMenu} />
            <div className='flex h-[100vh]'>
              <div className={`bg-primaryBg fixed left-0 top-0 bottom-0 w-[220px] z-50 ${showMenu ? '' : 'transform -translate-x-full md:translate-x-0'} duration-300 ease-in-out md:static md:z-0`}>
                <Navbar showMenu={showMenu} setShowMenu={setShowMenu} menu={menu} setMenu={setMenu} />
              </div>
              <div className='page-bx w-full bg-gray-100'>
                <div className='w-full pt-16 pb-7'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home setMenu={setMenu} />} />
                    <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                    <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </CryptoContextProvider>
      </div>
    </div>
  )
}

export default App