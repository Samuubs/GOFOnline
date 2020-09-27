import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthInput from '../../components/AuthInput';

import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/background.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { useAuth } from '../../contexts/auth';

import './styles.css';

function Login() {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useAuth();

    async function handleLogin(e) {
        e.preventDefault();
        const response = await signIn(username, password);
        if (response) {
            history.push("/");
        } else {
            alert("Erro ao realizar login!")
        }
    }

    return (
        <div id="login-page-container" className="container">
            <div className="proffy-board">
                <div className="login-background" style={{ backgroundImage: `url(${Background})` }}/>
                <img src={Logo} alt="" className="login-logo" />
                <p>
                    Sua plaforma de estudos online.
                </p>
            </div>
            <div className="login-container">
                <main>
                    <h2>Fazer Login</h2>
                    <form onSubmit={handleLogin}>
                        <AuthInput
                            name="username"
                            placeholder="Nome de Usuário"
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                        <AuthInput
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <div className="user-helps">
                            <div className="remember-container">
                                <input type="checkbox" name="Lembrar-me" id="remember" />
                                <span>Lembar-me</span>
                            </div>

                            <Link to="/" className="forgot-password">Esqueci minha senha</Link>
                        </div>
                        <button type="submit">Entrar</button>
                    </form>

                    <div className="footer-login">
                        <Link to="/register" className="register">
                            Não tem conta?
                            <br />
                            <span>Cadastre-se</span>
                        </Link>

                        <span>É de graça! <img src={purpleHeartIcon} alt="Coração roxo" /></span>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Login;