import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        // Guarda el nombre de usuario y rol en el localStorage
        localStorage.setItem('user', data.user);  // Guarda el nombre de usuario
        localStorage.setItem('rol', data.rol);    // Guarda el rol obtenido de la API
        navigate('/');  // Redirige al inicio
      } else {
        alert(data.message);  // Muestra un mensaje si ocurre un error
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Usuario" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
