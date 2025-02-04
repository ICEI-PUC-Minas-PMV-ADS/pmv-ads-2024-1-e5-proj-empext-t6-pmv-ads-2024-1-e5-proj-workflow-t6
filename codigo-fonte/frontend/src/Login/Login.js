import React, { useState } from 'react';
import './Login.css';
import Navbar from "../NavBar/NavBar";
import { useNavigate } from 'react-router-dom';
import { showToast } from "../ToastContainer";
import axiosInstance from '../axiosInstance';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login/', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token)
      showToast('Operação realizada com sucesso!', 'success');
      navigate('/home');
    } catch (error) {
      showToast('Credenciais inválidas!', 'error');
    }

  };

  return (
    <div>
      <Navbar pageName={'login'} />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Fazer Login</h2>
          {error && <p>{error}</p>}
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <ul>
              <a className="fs-14" href="#">Esqueci minha senha</a>
            </ul>
          </div>
          <button className="form-button" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;