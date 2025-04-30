import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);
  
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        alert('Producto agregado');
        setForm({ name: '', description: '', price: '', stock: '' });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddProduct;
