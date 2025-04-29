import { useEffect, useState } from "react";

function ProductList() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
          .then(res => res.json())
          .then(data => setProductos(data))
          .catch(error => console.error('Error al cargar productos:', error));
      }, []);

      return (
        <div> 
            <h2>Listado de productos</h2>
            <ul>
                {productos.map(p => (
                    <li key={p.id}>
                        <strong>{p.name}</strong> - ${p.price} - stock: {p.stock}
                    </li>
                ))}
            </ul>
        </div>
      );
}

export default ProductList;