import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";

import "./style/Coins.css"; // Import custom CSS file for styling

const Coins = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartDuration, setChartDuration] = useState("7d"); // Default duration is 7 days

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCoinData(data);
      })
      .catch((error) => console.error(error));

    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${getDaysForChartDuration()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoinData((prevData) => ({
          ...prevData,
          market_chart_data: data.prices,
        }));
      })
      .catch((error) => console.error(error));
  }, [id, chartDuration]);

  const getDaysForChartDuration = () => {
    switch (chartDuration) {
      case "1d":
        return 1;
      case "1mon":
        return 30;
      case "7d":
        return 7;
      case "1year":
        return 365;
    }
  };

  if (!coinData) {
    return <div>Loading...</div>;
  }

  const chartData = coinData.market_chart_data
    ? coinData.market_chart_data.map((dataPoint) => ({
        date: new Date(dataPoint[0]).toLocaleDateString("en-US"),
        price: dataPoint[1].toFixed(2),
      }))
    : [];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        formatter: (value) => `$${value}`,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
          color: "#555",
        },
        ticks: {
          color: "#555",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Price (USD)",
          color: "#555",
        },
        ticks: {
          color: "#555",
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <>
      <Card className="coin-card">
        <Card.Body>
          <div className="coin-info">
            <div className="coin-details">
              <img
                src={coinData.image.large}
                alt={`${coinData.name} logo`}
                className="coin-logo"
              />
              <div className="coin-info-details">
                <h4 className="coin-name">{coinData.name}</h4>
                <div className="coin-stats">
                  <div className="coin-stat">
                    <p className="coin-label">Symbol:</p>
                    <p className="coin-value">
                      {coinData.symbol.toUpperCase()}
                    </p>
                  </div>
                  <div className="coin-stat">
                    <p className="coin-label">Market Cap Rank:</p>
                    <p className="coin-value">{coinData.market_cap_rank}</p>
                  </div>
                  <div className="coin-stat">
                    <p className="coin-label">Current Price (USD):</p>
                    <p className="coin-value">
                      ${coinData.market_data.current_price.usd.toFixed(2)}
                    </p>
                  </div>
                  <div className="coin-stat">
                    <p className="coin-label">Market Cap (USD):</p>
                    <p className="coin-value">
                      ${coinData.market_data.market_cap.usd.toLocaleString()}
                    </p>
                  </div>
                  <div className="coin-stat">
                    <p className="coin-label">Total Volume (USD):</p>
                    <p className="coin-value">
                      ${coinData.market_data.total_volume.usd.toLocaleString()}
                    </p>
                  </div>
                  <div className="coin-stat">
                    <p className="coin-label">Price Change (24h):</p>
                    <p className="coin-value">
                      {coinData.market_data.price_change_percentage_24h}%
                    </p>
                  </div>
                </div>
                <div className="coin-categories">
                  <Badge variant="primary">
                    {coinData.categories.join(", ")}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

{/* Chart */}
      <Card className="chart-card">
        <Card.Body>
          <div className="chart-container">
            <LineChart
              width={800} // Adjust the width to your liking
              height={400}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#555" tick={{ fill: "#555" }} />
              <YAxis stroke="#555" tick={{ fill: "#555" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#555",
                  color: "#fff",
                  border: "none",
                }}
                labelStyle={{ color: "#fff" }}
                formatter={(value) => `$${value}`}
              />
              <Line
                options={chartOptions}
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
            <div className="chart-buttons">
              <button
                onClick={() => setChartDuration("1d")}
                className={`chart-button ${
                  chartDuration === "1d" ? "active" : ""
                }`}
              >
                1D
              </button>
              <button
                onClick={() => setChartDuration("7d")}
                className={`chart-button ${
                  chartDuration === "7d" ? "active" : ""
                }`}
              >
                7D
              </button>
              <button
                onClick={() => setChartDuration("1mon")}
                className={`chart-button ${
                  chartDuration === "1mon" ? "active" : ""
                }`}
              >
                1M
              </button>
              <button
                onClick={() => setChartDuration("1year")}
                className={`chart-button ${
                  chartDuration === "1year" ? "active" : ""
                }`}
              >
                1Y
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
{/*  Description*/}
      <Card className="description-card">
        <Card.Body>
          <div className="coin-description">
            <h4 className="description-title">Description:</h4>
            <p className="description-content">{coinData.description.en}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Coins;
