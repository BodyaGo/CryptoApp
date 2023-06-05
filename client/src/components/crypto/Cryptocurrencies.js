import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cryptocurrencies() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => {
        setCryptos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Top 10 Cryptocurrencies</h2>
      <div className="crypto-container">
        {cryptos.map((crypto, index) => (
          <div className="crypto-block" key={index}>
            <img src={crypto.image} alt={crypto.name} />
            <h3>{crypto.name}</h3>
            <p>Current Price: ${crypto.current_price}</p>
            <p>Market Cap: ${crypto.market_cap}</p>
            <p>24h Change: {crypto.price_change_percentage_24h}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cryptocurrencies;
