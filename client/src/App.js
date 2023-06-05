import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import Home from './components/Home';
import News from './components/News';

import Footer from './components/Footer';


import Cryptocurrencies from './components/crypto/Cryptocurrencies';
import Exchanges from './components/crypto/Exchanges';
import CryptoDetails from './components/crypto/CryptoDetails';


import Login from './components/user/Login';
import Registration from './components/user/Registration';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/crypto/:coinId" element={<CryptoDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
