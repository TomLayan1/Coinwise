import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { CryptoContext } from '../../Context/CryptoContext'
import LineChart from '../../Components/LineChart/LineChart'

const CryptoDetails = () => {

  const { coinId } = useParams();
  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']
  const [timePeriod, setTimePeriod] = useState('1y')


  const { cryptoDetails, fetchCoinDetails, coinHistory, fetchCryptoHistory } = useContext(CryptoContext);

  // If a coin has been clicked, assign the coinId to fetchCoinDetails
  useEffect(() => {
    if(coinId) {
      fetchCoinDetails(coinId);
    }
  }, [coinId, fetchCoinDetails])

  // 
  useEffect(() => {
    if (coinId && timePeriod) {
      fetchCryptoHistory(coinId, timePeriod)
    }
  }, [coinId, timePeriod, fetchCryptoHistory])
  
  return (
    <div className='min-h-[96.5vh]'>
      {cryptoDetails && (
          <div className='text-sm'>
            <div className='flex items-center justify-center gap-2 mb-6'>
              <img className='w-10' src={cryptoDetails.iconUrl} alt={cryptoDetails.name}/>
              <h1 className='text-2xl font-bold text-center'> {cryptoDetails.name} ({cryptoDetails.symbol})</h1>
            </div>

            <hr className='mb-6'/>
              <select
                className='border px-4 py-1 mb-7 text-base outline-none'
                defaultValue='7d'
                placeholder="Select Period"
                onChange={(e) => setTimePeriod(e.target.value)}>
                {time.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <LineChart className='hidden' coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
          
          <div className='md:flex md:w-full justify-between'>
            <div className='md:w-[57%] lg:w-[70%]'>
              <div className='w-[100%] m-auto md:m-0 mb-8 md:mb-16 lg:w-[60%]'>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Rank: <span className='font-bold'>{millify(cryptoDetails.rank)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Price: <span className='font-bold'>${millify(cryptoDetails.price)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Market Cap: <span className='font-bold'>{millify(cryptoDetails.marketCap)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Change: <span className='font-bold'>{cryptoDetails.change}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Total Supply: <span className='font-bold'>{millify(cryptoDetails.supply.total)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Circulating Supply: <span className='font-bold'>{millify(cryptoDetails.supply.circulating)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>All Time High: <span className='font-bold'>{millify(cryptoDetails.allTimeHigh.price)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Market Cap: <span className='font-bold'>{millify(cryptoDetails.marketCap)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Change: <span className='font-bold'>{cryptoDetails.change}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>Number of Market: <span className='font-bold'>{millify(cryptoDetails.numberOfMarkets)}</span></p>
                <p className='text-center mb-2 flex justify-between py-2 px-2 border border-slate-400'>All Time High: <span className='font-bold'>{cryptoDetails.numberOfExchanges}</span></p>
              </div>

              <div className='mb-7'>
                <h2 className='text-2xl mb-4'>What is {cryptoDetails.name}</h2>
                <p className='text-grayLight'>{cryptoDetails.description}</p>
              </div>
            </div>

            <div className='md:w-[37%] lg:w-[30%]'>
              <h2 className='text-2xl mb-3'>{cryptoDetails.name} Links</h2>
              {cryptoDetails.links.map(link => (
                <div key={link.name} className='w-full flex justify-between mb-4 border py-2 px-2 border-slate-400'>
                  <p className='text-'>{link.type}</p>
                  <a href={link.url} className='text-primaryColor'>{link.name}</a>
                </div>
              ))}
            </div>
            </div>
          </div>
      )}
    </div>
  )
}

export default CryptoDetails