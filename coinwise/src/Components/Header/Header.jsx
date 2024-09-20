import React from 'react'
import { FaBars } from 'react-icons/fa'

const Header = ({showMenu, setShowMenu}) => {
  return (
    <>
      {showMenu && <div onClick={() => setShowMenu(false)} className='fixed top-0 left-0 w-full h-[100vh] bg-grayBg z-20'></div>}
      <header className='h-[40px] w-[99.8%] bg-primaryBg py-3 px-8 md:px-0 flex items-center fixed top-0 left-0 border-gray-500 border-b z-30'>
        <div onClick={() => setShowMenu(!showMenu)} className='w-[7%] md:hidden'>
          <FaBars className='hamburger-x' size={22} style = {{cursor: 'pointer', color: 'white' }}/>
        </div>
        <div className='w-[87%] md:w-[187px]'>
          <h2 className='text-primaryColor font-bold tracking-widest text-xl text-center md:text-left md:ml-3'>COIN<span className='text-white'>WISE</span></h2>
        </div>
      </header>
    </>
  )
}

export default Header