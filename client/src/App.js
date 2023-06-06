import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// app routes
import Header from './components/Header';
import Home from   './components/Home';
import News from   './components/News';
import Footer from './components/Footer';
import FavoriteCoins from './components/FavoriteCoins'


// Crypto
import Cryptocurrencies from './components/crypto/Cryptocurrencies';
import Exchanges        from './components/crypto/Exchanges';
import Coins from './components/crypto/Coins';
// user
import Login        from './components/user/Login';
import Registration from './components/user/Registration';
import User         from './components/user/User';

// bootstrap
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
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user" element={<User />} />
          <Route path="/FavoriteCoins" element={<FavoriteCoins />} />
          <Route path="/coins/:id" element={<Coins />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
