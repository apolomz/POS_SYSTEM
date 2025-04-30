import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/addProduct';
import SaleList from './pages/SaleList'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/agregar-producto" element={<AddProduct />} />
          <Route path="/Lista" element={<SaleList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
