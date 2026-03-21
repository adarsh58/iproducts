import './App.css';
import Login from './components/login';
import Navbar from './components/navbar';
import Home from './components/home';
import Productcard from './components/productcard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductState from './contextapi/ProductState';

function App() {
  return (
    <ProductState>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productcard" element={<Productcard />} />
      </Routes>
    </BrowserRouter>
    </ProductState> 
  );
}

export default App;
