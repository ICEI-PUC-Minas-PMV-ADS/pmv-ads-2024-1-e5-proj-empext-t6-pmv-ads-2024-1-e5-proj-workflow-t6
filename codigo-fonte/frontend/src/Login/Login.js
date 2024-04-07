import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Navbar from "../NavBar/NavBar";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        email,
        password
      });
      console.log('Login bem-sucedido:', response.data);
      navigate('/home');
    } catch (error) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div>
      <Navbar isLoginPage={true} />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Fazer Login</h2>
          {error && <p>{error}</p>}
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <ul>
              <a className="fs-14" >Esqueceu a senha?</a>
            </ul>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;