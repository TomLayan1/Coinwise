import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);


const LineChart = ({coinHistory, currentPrice, coinName}) => {

  // Check if coinHistory is defined and has the necessary properties
  if (!coinHistory || !coinHistory.history) {
    return <div>Loading...</div>;
  }

  // Loop over coin history to get coinPRice and timeStamp
  const coinPrice = [];
  const coinTimeStamp = [];

  // This will loop till it gets to theend of the coin history
  for (let i = 0; i < coinHistory?.history?.length; i += 1) {
    const price = coinHistory.history[i].price;
    coinPrice.push(price);
    coinTimeStamp.push(new Date(coinHistory.history[i].timestamp * 1000).toLocaleDateString());
  }

  // data object
  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        backgroundColor: '#47a3ff',
        borderColor: '#47a3ff',
        fill: false
      }
    ]
  };

  // options object
  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      }
    }
  };

  return (
    <div className='mb-12'>
      <div className='mt-4 mb-10 flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
        <h2 className='text-2xl'>{coinName} Price Chart</h2>
        <div className='flex gap-6 font-bold'>
          <div>{coinHistory.change ? coinHistory.change : 'N/A'}</div>
          <div>{coinName} Price: ${currentPrice}</div>
        </div>
      </div>

        <Line data={data} options={options} />
    </div>
  )
}

export default LineChart