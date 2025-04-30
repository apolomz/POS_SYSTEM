import { useState, useEffect } from 'react';

function SalesForm() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    product_id: '',
    quantity: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        alert('Venta registrada');
        setForm({ product_id: '', quantity: '' });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Venta</h2>
      <select name="product_id" value={form.product_id} onChange={handleChange} required>
        <option value="">Seleccione un producto</option>
        {productos.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <input type="number" name="quantity" placeholder="Cantidad" value={form.quantity} onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default SalesForm;
