import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory.length; i++) {
    coinPrice.push(coinHistory[i][1]);
    coinTimestamp.push(new Date(coinHistory[i][0]).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `${coinName} Price`,
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${coinName} Price Chart`,
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value, index, values) => `$${value.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <>
      <div className='header'>
        <h1 className='title'>{coinName} Price Chart</h1>
        <div className='price-container'>
          <h4 className='price'>
            Current Price: ${currentPrice}
          </h4>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
