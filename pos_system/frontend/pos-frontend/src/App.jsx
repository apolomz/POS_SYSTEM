import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/addProduct';
import SaleList from './pages/SaleList'
import './App.css';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/agregar-producto" element={<ProtectedRoute rolPermitido= 'admin'> <AddProduct /> </ProtectedRoute>} />
          <Route path="/Lista" element={<SaleList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
