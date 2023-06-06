import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

function Header() {
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">CryptoApp</Link>
      </div>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item">
            <Link to="/">Home</Link>
          </li>
          <li className="header__menu-item">
            <Link to="/news">News</Link>
          </li>
          <li className="header__menu-item">
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </li>
          {Object.keys(userData).length ? (
            <>
              <li className="header__menu-item">
                <Link to="/FavoriteCoins">FavoriteCoins</Link>
              </li>
              <li className="header__menu-item">
                <Link to="/user">{userData.username}</Link>
              </li>
            </>
          ) : (
            <>
              <li className="header__menu-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="header__menu-item">
                <Link to="/registration">Registration</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
