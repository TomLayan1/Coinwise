import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

export const CryptoContext = createContext(null);

const CryptoContextProvider = (props) => {

  // API response will be saved in this state
  const [cryptoData, setcryptoData] = useState(null);
  const [cryptoCoins, setCryptoCoins] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This state will save the coinId of any coin that is clicked
  const [cryptoDetails, setCryptoDetails] = useState(null);

  // This state will save each coin history so it can be used in the line chart componebt
  const [coinHistory, setCoinHistory] = useState(null);


  useEffect(() => {
    // Create a function to make API request
    const fetchCoinData = async () => {
      // This code snippet is gotten from rapidAPI
      // Paste the copied code and use it to make the API call 
      const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        headers: {
          'x-rapidapi-key': '0d93fb5ea1msh5470af294a84a62p1b2147jsn2376be21262b',
          'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        setcryptoData(response?.data?.data);
        setCryptoCoins(response?.data?.data?.coins || [])
        setLoading(false)
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }

    fetchCoinData();
  }, [])
  

  // Fetch details for a specific coin
  // The useCallback allows the function to be recreated on every render
  const fetchCoinDetails = useCallback(async (coinId) => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      headers: {
        'x-rapidapi-key': '0d93fb5ea1msh5470af294a84a62p1b2147jsn2376be21262b',
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setCryptoDetails(response?.data?.data?.coin);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);


  // Function to fetch crypto history
  const fetchCryptoHistory = useCallback(async (coinId, timePeriod) => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: timePeriod,
        tiers: '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0'
      },
      headers: {
        'x-rapidapi-key': '0d93fb5ea1msh5470af294a84a62p1b2147jsn2376be21262b',
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setCoinHistory(response?.data?.data)
    } catch (error) {
      setError(error.message);
    }
  }, []);
  
  const contextValue = {
    cryptoData,
    loading,
    error,
    cryptoCoins,
    setCryptoCoins,
    cryptoDetails,
    fetchCoinDetails,
    coinHistory,
    fetchCryptoHistory,
  }

  return (
    <CryptoContext.Provider value={contextValue}>
      {props.children}
    </CryptoContext.Provider>
  )
}

export default CryptoContextProvider;