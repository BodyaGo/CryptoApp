import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import "./style/Coin.css";

const Coin = ({ coin, deleteCoinHandler, watchList, addCoinHandler }) => {
  const isCoinInWatchList = watchList.includes(coin.id);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowDeleteButton(false);
    }, 2000);
  };

  return (
    <>
      <Link
        to={`/coins/${coin.id}`}
        className="text-decoration-none my-1 coin"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <li className="coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark">
          <img className="coinlist-image" src={coin.image} alt="" />
          <span className="coin-name">{coin.name}</span>
          <span className="coin-price">{coin.current_price}$</span>

          <span
            className={
              coin.price_change_percentage_24h < 0
                ? "price-change text-danger mr-2"
                : "price-change text-success mr-2"
            }
          >
            {coin.price_change_percentage_24h < 0 ? (
              <i className="fas fa-sort-down align-middle mr-1"></i>
            ) : (
              <i className="fas fa-sort-up align-middle mr-1"></i>
            )}
            {coin.price_change_percentage_24h}$
          </span>
        </li>
      </Link>

      {!isCoinInWatchList && (
        <Button
          onClick={() => addCoinHandler(coin.id)}
          className="coinlist-item add-button"
        >
          Add to Favorites
        </Button>
      )}

      {isCoinInWatchList && (
        <>
          {showDeleteButton && (
            <Button
              onClick={() => deleteCoinHandler(coin.id)}
              className="coinlist-item delete-button"
            >
              Remove from Favorites
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default Coin;
