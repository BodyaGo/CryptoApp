import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaUser, FaBirthdayCake } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import coinGecko from "./crypto/coinGecko";
import Coin from "./crypto/Coin";

function FavoriteCoins() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
      setLoading(false);
    }
  }, []);

  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || [
      "bitcoin",
      "ethereum",
      "ripple",
      "litecoin",
    ]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const deleteCoin = (coin) => {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((el) => el !== coin)
    );
  };

  const addCoin = (coin) => {
    if (!watchList.includes(coin)) {
      setWatchList((prevWatchList) => [...prevWatchList, coin]);
    }
  };

  const [isActive, setIsActive] = useState(false);
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];

  const handleClick = (coin) => {
    addCoin(coin);
    setIsActive(false);
  };

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: watchList.join(","),
          },
        });
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setIsLoading(false);
    };

    if (watchList.length > 0) {
      fetchData();
    } else {
      setCoins([]);
    }
  }, [watchList]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (filteredCoins.length === 0) {
      return <div>No coins found</div>;
    }
  
    return (
      <ul className="coinlist list-group mt-2">
        {filteredCoins.map((coin) => {
          const savings = coin.quantity * coin.current_price;
          if (watchList.includes(coin.id)) {
            return (
              <Coin
                key={coin.id}
                coin={coin}
                watchList={watchList}
                deleteCoinHandler={deleteCoin}
                addCoinHandler={addCoin}
              >
                <div className="coin-savings">
                  <span className="coin-savings-label">Savings:</span>
                  <span className="coin-savings-amount">${savings}</span>
                </div>
              </Coin>
            );
          } else {
            return null;
          }
        })}
      </ul>
    );
  };
  

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card className="profile-card">
            <Card.Header className="text-center">
              <h1 className="profile-title">
                {userData.username}! Your favorite cryptocurrencies are here
              </h1>
            </Card.Header>
          </Card>
        </div>
      </div>

      <div className="dropdown">
        <Button
          onClick={() => setIsActive(!isActive)}
          className="btn btn-primary dropdown-toggle"
          type="button"
        >
          Add favorite Coin
        </Button>
        <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
          {availableCoins.map((el) => {
            return (
              <a
                key={el}
                onClick={() => handleClick(el)}
                href="#"
                className="dropdown-item"
              >
                {el}
              </a>
            );
          })}
        </div>
      </div>

      <Form className="my-3">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search coins"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      {renderCoins()}
    </div>
  );
}

export default FavoriteCoins;
