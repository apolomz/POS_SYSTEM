import './App.css'
import ProductList from './components/productList';
import AddProduct from './components/addProduct';


function App() {
  return (
    <div>
      <h1>Sistema POS - React + Flask + PostgreSQL</h1>
      <ProductList />
      <p>Bienvenido al sistema de facturación</p>
      <AddProduct />
    </div>
  );
}

export default App;