import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
      <Link to="/productos">Productos</Link>
    </nav>
    )
}

export default Navbar;