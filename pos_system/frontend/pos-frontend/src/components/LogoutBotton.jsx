import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    navigate('/login');
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}

export default LogoutButton;
