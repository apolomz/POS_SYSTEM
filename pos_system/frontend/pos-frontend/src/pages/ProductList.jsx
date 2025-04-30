import { useEffect, useState } from "react";

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar productos:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
      .then(() => fetchProducts());
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({ name: product.name, price: product.price, stock: product.stock });  // Aseguramos que también cargue el stock
  };

  const handleSave = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      setEditingId(null);
      fetchProducts();
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Listado de Productos</h2>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {editingId === p.id ? (
              <>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  style={{ marginRight: '10px' }}
                />
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Precio"
                  style={{ marginRight: '10px' }}
                />
                <input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  style={{ marginRight: '10px' }}
                />
                <button onClick={() => handleSave(p.id)} style={{ marginRight: '5px' }}>
                  Guardar
                </button>
                <button onClick={() => setEditingId(null)}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <strong>{p.name}</strong> - ${p.price} - Stock: {p.stock}  {/* Mostrar el stock */}
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => handleEdit(p)} style={{ marginRight: '5px' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(p.id)}>
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
