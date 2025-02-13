import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ReadComponent from './components/IndexComponent';
import AboutUs from './pages/Aboutus';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import MainComponent from './components/MainComponent';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<ReadComponent />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<MainComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
    </Router>
    
  );
}

export default App;
