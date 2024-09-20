import React, { useContext } from 'react'
import { CryptoContext } from '../../Context/CryptoContext'
import millify from 'millify';
import { Link } from 'react-router-dom';
import Cryptocurrencies from '../Cryptocurrencies/Cryptocurrencies';

const Home = ({ setMenu }) => {
  // Destructure the context value needed
  const { cryptoData, loading, error } = useContext(CryptoContext);

  // If fetching is in process
  if (loading) return <div className='min-h-[81.2vh] text-lg'>Loading...</div>;
  // If an error occurs
  if (error) return <div className='min-h-[81.2vh] text-2xl'>Error: {error.message}</div>;

  return (
    <div id='/home' className='min-h-[97vh]'>
      <div className='container'>
        <h2 className='text-2xl mb-3'>Global Crypto Stats</h2>
        <div className='text-grayLight w-full grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <div className='w-full bg-slate-300 px-3 py-1'>
            <p className='text-base'>Total Cryptocurrencies</p>
            <h5 className='text-base md:text-lg font-bold'>{millify(cryptoData.stats.total)}</h5>
          </div>
          <div className='w-full bg-slate-300 px-3 py-1'>
            <p className='text-base'>Total Exchanges</p>
            <h5 className='text-base md:text-lg font-bold'>{cryptoData.stats.totalExchanges}</h5>
          </div>
          <div className='w-full bg-slate-300 px-3 py-1'>
            <p className='text-base'>Total Market Cap</p>
            <h5 className='text-base md:text-lg font-bold'>{millify(cryptoData.stats.totalMarketCap)}</h5>
          </div>
          <div className='w-full bg-slate-300 px-3 py-1'>
            <p className='text-base'>Total 24th Volume</p>
            <h5 className='text-base md:text-lg font-bold'>{millify(cryptoData.stats.total24hVolume)}</h5>
          </div>
          <div className='w-full bg-slate-300 px-3 py-1'>
            <p className='text-base'>Total Markets</p>
            <h5 className='text-base md:text-lg font-bold'>{millify(cryptoData.stats.totalMarkets)}</h5>
          </div>
        </div>
      </div>

      <div className='mt-5 md:mt-14'>
        <div className='flex items-baseline justify-between container'>
          <h2 className='text-sm mb-4 md:text-xl md:mb-4'>Top 10 Cryptocurrencies In The World</h2>
          <h2 className='text-xs md:text-sm text-primaryColor cursor-pointer' onClick={() => setMenu('Cryptocurrencies')}><Link to={'/cryptocurrencies'}>Show more</Link></h2>
        </div>
        <Cryptocurrencies simplified count={10} />
      </div>
    </div>
  )
}

export default Home