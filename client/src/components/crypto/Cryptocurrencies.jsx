import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Cryptocurrencies.css';

function Cryptocurrencies() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(12);
  const [favorites, setFavorites] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`
      )
      .then((response) => {
        setCryptos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError('Unable to fetch data. Please try again later.');
      });
  }, [perPage]);

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLoadMore = () => {
    setPerPage((prevPerPage) => prevPerPage + 10);
  };

  const handleLoadFive = () => {
    setPerPage((prevPerPage) => prevPerPage + 5);
  };

  const handleReviewInformation = (crypto) => {
    history(`/coins/${crypto.id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Top {filteredCryptos.length} Cryptocurrencies</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredCryptos.map((crypto, index) => (
          <div className="col" key={index}>
            <div className="card h-100">
              <img
                src={crypto.image}
                alt={`${crypto.name} icon`}
                className="crypto-icon"
              />
              <div className="card-body">
                <h5 className="card-title">{crypto.name}</h5>
                <p className="card-text">
                  Current Price: ${parseFloat(crypto.current_price).toFixed(2)}
                </p>
                <p className="card-text">
                  Market Cap: ${parseFloat(crypto.market_cap).toLocaleString()}
                </p>
                <p
                  className={`card-text ${
                    crypto.price_change_percentage_24h < 0
                      ? 'text-danger'
                      : 'text-success'
                  }`}
                >
                  24h Change: {parseFloat(crypto.price_change_percentage_24h).toFixed(2)}%
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleReviewInformation(crypto)}
                >
                  Review Information
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          {filteredCryptos.length < cryptos.length && (
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          )}
          <button className="btn btn-primary" onClick={handleLoadFive}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cryptocurrencies;
