import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Header from '../Header/Header';

const Navbar = ({menu, setMenu, showMenu, setShowMenu}) => {

  const navigation = [
    {
      name: 'Home',
      icons: <i class='bx bx-home-alt mr-4'></i>,
      path: '/'
    },
    {
      name: 'Cryptocurrencies',
      icons: <i class='bx bxs-coin-stack mr-4'></i>,
      path: '/cryptocurrencies'
    }
  ]

  const handleNav = (name) => {
    const selectedNav = navigation.find(nav => (nav.name === name))
    setMenu(selectedNav.name)
    setShowMenu(false)
  }

  if (handleNav) {
    <Header handleNav={handleNav}  />
  }

  return (
    <>
      <div className='w-full h-[55px] pt-3 md:py-20'>
        <div className='px-[20px]'>
          <FaTimes onClick={() => setShowMenu(!showMenu)} className='md:hidden' size={22} style = {{marginBottom: '35px', cursor: 'pointer', color: 'white' }}/>
        </div>
        <nav className='list-none text-primaryColor flex flex-col text-sm'>
          {navigation.map( nav => (
            <Link key={nav.name} to={nav.path} onClick={() => handleNav(nav.name)} className={`px-3 mb-4 h-7 flex items-center ${nav.name === menu ? 'bg-primaryColor text-primaryBg' : ''} duration-300 ease-in-out`}>
            {nav.icons}
            <p>{nav.name}</p>
          </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar