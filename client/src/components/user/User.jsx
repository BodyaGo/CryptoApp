import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaUser, FaBirthdayCake } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import coinGecko from "../crypto/coinGecko";
import Coin from "../crypto/Coin";

function User() {
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

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    history.push("/login");
    window.location.reload();
  };

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

  const deleteCoinHandler = (coinId) => {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((coin) => coin !== coinId)
    );
  };

  const addCoin = (coin) => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
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

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (coins.length === 0) {
      return <div>No Favorites coins found</div>;
    }

    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              coin={coin}
              deleteCoinHandler={deleteCoinHandler}
              watchList={watchList}
            />
          );
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
              <h1 className="profile-title">Welcome {userData.username}</h1>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  {loading ? (
                    <p>Loading user data...</p>
                  ) : (
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
                      <br />
                      <Button variant="primary" onClick={handleLogOut}>
                        Log Out
                      </Button>
                    </Form>
                  )}
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
        </div>
      </div>

      <div className="dropdown">
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

      {renderCoins()}
    </div>
  );
}

export default User;
