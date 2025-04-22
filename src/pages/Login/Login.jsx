import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormLogin.css';
import laboratoriosabd from './laboratoriosabd.png';

const FormLogin = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://pruebasubidabd.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        
        
        if (data.role === 'admin') {
          navigate('/admin-dashboard', { state: { token: data.token } });
        } else if (data.role === 'publico') {
          navigate('/publico-dashboard', { state: { token: data.token } });
        }
      } else {
        setError(data.msg || 'Error al iniciar sesión');
      }
    } catch {
      setError('Error al conectarse al servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="logo-panel">
          <img src={laboratoriosabd} alt="Laboratorios ABD" className="logo-image" />
        </div>

        
        <div className="form-panel">
          <div className="form-header">
            <h1>BIENVENIDO</h1>
            <h2>INICIAR SESIÓN</h2>
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input
                type="text"
                id="usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                className="form-control"
              />
            </div>

            <div className="button-container">
              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
