import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/agregar-producto" style={{ marginLeft: '1rem' }}>Agregar Producto</Link>
      <Link to="/Lista" style={{ marginLeft: '1rem'}}>Lista de ventas</Link>
    </nav>
    )
}

export default Navbar;