import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaUser, FaBirthdayCake } from "react-icons/fa";

function Home() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [bitcoinChartData, setBitcoinChartData] = useState([]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=8"
    )
      .then((response) => response.json())
      .then((data) => setCryptocurrencies(data))
      .catch((error) => console.error(error));

    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
    )
      .then((response) => response.json())
      .then((data) => setBitcoinChartData(data.prices))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  const topGainers = [
    { name: "Bitcoin", symbol: "BTC", price_change_percentage_24h: 5.5 },
    { name: "Ethereum", symbol: "ETH", price_change_percentage_24h: 4.2 },
    { name: "Bitcoin", symbol: "BTC", price_change_percentage_24h: 5.5 },
    { name: "Ethereum", symbol: "ETH", price_change_percentage_24h: 4.2 },
    { name: "Bitcoin", symbol: "BTC", price_change_percentage_24h: 5.5 },
    { name: "Ethereum", symbol: "ETH", price_change_percentage_24h: 4.2 },
    { name: "Bitcoin", symbol: "BTC", price_change_percentage_24h: 5.5 },
    { name: "Ethereum", symbol: "ETH", price_change_percentage_24h: 4.2 },
    // Add more top gainers here
  ];

  const topLosers = [
    { name: "Cardano", symbol: "ADA", price_change_percentage_24h: -7.2 },
    { name: "Binance Coin", symbol: "BNB", price_change_percentage_24h: -5.6 },
    { name: "Cardano", symbol: "ADA", price_change_percentage_24h: -7.2 },
    { name: "Binance Coin", symbol: "BNB", price_change_percentage_24h: -5.6 },
    { name: "Cardano", symbol: "ADA", price_change_percentage_24h: -7.2 },
    { name: "Binance Coin", symbol: "BNB", price_change_percentage_24h: -5.6 },
    { name: "Cardano", symbol: "ADA", price_change_percentage_24h: -7.2 },
    { name: "Binance Coin", symbol: "BNB", price_change_percentage_24h: -5.6 },
    // Add more top losers here
  ];

  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-4">
        {Object.keys(userData).length ? (
          <Card to="/user" className="card">
            <Card.Header className="text-center">
              <h1 className="profile-title">Welcome {userData.username}</h1>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="form-label">
                        <FaEnvelope className="form-icon" /> Email:{" "}
                        {userData.email}
                      </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="form-label">
                        <FaUser className="form-icon" /> Username:{" "}
                        {userData.username}
                      </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formBasicAge">
                      <Form.Label className="form-label">
                        <FaBirthdayCake className="form-icon" /> Age:{" "}
                        {userData.age}
                      </Form.Label>
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" onClick={handleLogOut}>
                      Log Out
                    </Button>
                  </Form>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <Card.Img
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <>
            <div className="registration-box text-center">
              <h2>Register for our cryptocurrency app</h2>
              <Link to="/login" className="btn btn-outline-primary mx-2">
                Login
              </Link>
              <Link to="/registration" className="btn btn-outline-primary mx-2">
                Registration
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="text-center my-5">
        <h1>Welcome to Cryptocurrency App!</h1>
        <p>
          This is a web application that provides the latest news and prices on
          cryptocurrencies.
        </p>
      </div>

      <table className="table table-striped table-bordered table-hover">
        <thead className="bg-primary text-white">
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Logo</th>
            <th>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {cryptocurrencies.map((cryptocurrency) => (
            <tr key={cryptocurrency.id}>
              <td>
                <Link to={`/coins/${cryptocurrency.id}`}>
                  {cryptocurrency.symbol.toUpperCase()}
                </Link>
              </td>
              <td>
                <Link to={`/coins/${cryptocurrency.id}`}>
                  {cryptocurrency.name}
                </Link>
              </td>
              <td>{cryptocurrency.current_price.toFixed(2)}</td>
              <td>
                <img
                  src={cryptocurrency.image}
                  alt={`${cryptocurrency.name} logo`}
                  width="50"
                />
              </td>
              <td
                style={{
                  color:
                    cryptocurrency.price_change_percentage_24h > 0
                      ? "green"
                      : "red",
                }}
              >
                {cryptocurrency.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row my-5">
        <div className="col-sm-6">
          <h2>Top Gainers</h2>
          <table className="table table-striped table-hover">
            <thead className="bg-success text-white">
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Change (24h)</th>
              </tr>
            </thead>
            <tbody>
              {topGainers.map((gainer, index) => (
                <tr key={index}>
                  <td>{gainer.symbol.toUpperCase()}</td>
                  <td>{gainer.name}</td>
                  <td style={{ color: "green" }}>
                    {gainer.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-sm-6">
          <h2>Top Losers</h2>
          <table className="table table-striped table-hover">
            <thead className="bg-danger text-white">
              <tr>
                <th>Stock</th>
                <th>Price</th>
                <th>% Change</th>
              </tr>
            </thead>
            <tbody>
              {topLosers.map((gainer, index) => (
                <tr key={index}>
                  <td>{gainer.symbol.toUpperCase()}</td>
                  <td>{gainer.name}</td>
                  <td style={{ color: "red" }}>
                    {gainer.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center my-5">
          <h2>Price Chart (BTC/USD)</h2>
          <div className="card shadow-lg">
            <div className="card-body">
              <LineChart width={1200} height={400} data={bitcoinChartData}>
                <XAxis dataKey="1" stroke="#555" />
                <YAxis stroke="#555" />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="1"
                  stroke="#8884d8"
                  dot={false}
                  strokeWidth={2}
                />
                <Tooltip />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
