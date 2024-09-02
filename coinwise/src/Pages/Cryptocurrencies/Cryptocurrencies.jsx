import React, { useContext, useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { CryptoContext } from '../../Context/CryptoContext'
import { motion } from 'framer-motion'

const Cryptocurrencies = ({ simplified, count=100 }) => {

  const { cryptoCoins } = useContext(CryptoContext)

  // Filtering the cryptoCoins and setting the state within the useEffect can cause an infinite loop because setCryptoCoins will trigger a re-render which will re-run the useEffect. Instead, create a new state for the filtered coins.
  // State for filtering coins during a search
  const [filteredCoins, setFilteredCoins] = useState([]);

  // State for search bar
  const [searchCoin, setSearchCoin] = useState('');
  
  useEffect(() => {
      const filteredData = cryptoCoins.filter((coin) => coin.name.toLowerCase().includes(searchCoin.toLowerCase()));
      setFilteredCoins(filteredData);
  }, [searchCoin, cryptoCoins]);

  return (
    <div className={`${!simplified ? 'min-h-[99vh]' : ''}`}>
      {!simplified && <h2 className='text-2xl mb-3'>Cryptocurrencies</h2>}
      {!simplified && <div className='mb-9 flex justify-center'>
        <input className='border h-9 w-[300px] pl-2 text-sm text-black outline-none' placeholder='Search for coin' onChange={(e)=>setSearchCoin(e.target.value)}/>
      </div>}
      <div className='w-full grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4'>
      {filteredCoins.slice(0, count).map((coin, i) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={coin.uuid} className='shadow-customShadow py-5 px-6 bg-white transform transition-transform duration-300 hover:scale-105'><Link to={`/crypto/${coin.uuid}`}>
          <div className='flex items-start justify-between mb-2'>
            <p className='text-[14px]'>{coin.rank}. {coin.name}</p>
            <img className='text-[14px] w-[20px]' src={coin.iconUrl} alt={coin.name} />
          </div>
          <hr/>
          <div className='flex flex-col gap-2 mt-2'>
            <p className='text-[14px]'>Price: {millify(coin.price)}</p>
            <p className='text-[14px]'>Market Cap: {millify(coin.marketCap)}</p>
            <p className='text-[14px]'>Daily Changes: {coin.change}%</p>
          </div>
        </Link></motion.div>
      ))}
      </div>
    </div>
  )
}

export default Cryptocurrencies