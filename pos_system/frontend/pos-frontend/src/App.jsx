import './App.css'
import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import SalesForm from './components/SalesFrom';
import SalesList from './components/SaleList';


function App() {
  return (
    <div>
      <h1>Sistema POS - React + Flask + PostgreSQL</h1>
      <p>Bienvenido al sistema de facturación</p>
      <SalesForm />
      <ProductList />
      <AddProduct />
      <SalesList />
    </div>
  );
}

export default App;