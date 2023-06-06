import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/exchanges')
      .then(response => {
        setExchanges(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Exchanges</h1>
      <ul>
        {exchanges.map(exchange => (
          <li key={exchange.id}>{exchange.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Exchanges;
