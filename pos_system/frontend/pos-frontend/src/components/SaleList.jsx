import { useEffect, useState } from 'react';

function SalesList() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sales')
      .then(res => res.json())
      .then(data => setVentas(data));
  }, []);

  return (
    <div>
      <h2>Historial de Ventas</h2>
      <ul>
        {ventas.map(v => (
          <li key={v.id}>
            {v.created_at} | {v.product_name} - Cant: {v.quantity} - Total: ${v.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesList;
