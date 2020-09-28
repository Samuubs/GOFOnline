import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import AuthInput from '../../components/AuthInput';
import AuthSelect from '../../components/AuthSelect';

import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/background.svg';
import Check from '../../assets/images/icons/check.svg';
import backIcon from '../../assets/images/icons/back.svg';

import api from '../../services/api';
import Loading from '../../components/Loading';

import './styles.css';

function FinishRegister() {
    return (
        <div className="finished-register-container">
            <img src={Check} alt="" />

            <h1>Cadastro concluído</h1>

            <p>
                Agora você faz parte da plataforma do GOF Online. <br />
                Tenha uma ótima experiência.
            </p>

            <Link to="/login" className="login-button">
                Fazer login
            </Link>

            <div className="finished-register-background" style={{ backgroundImage: `url(${Background})` }} />

        </div>
    )
}

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);

    const [registerFinished, setRegisterFinished] = useState(false);

    function handleRegister(e) {
        e.preventDefault();
        const user = {
            name,
            username,
            password,
            profile
        }

        setLoading(true);

        const response = api.post('/users', user);
        response.then(newUser => {
            console.log(newUser);
            if (response) {
                setLoading(false);
                setRegisterFinished(true);
            } else {
                alert("Erro ao realizar cadastro!");
            }
        }).catch((error) => {
            console.log(error);
            alert("Erro ao realizar cadastro!");
        })
    }

    if (registerFinished) {
        return FinishRegister()
    }

    return (
        <div id="register-page-container" className="container">
            {loading && <Loading />}
            <div className="register-container">
                <Link to="/login" className="backToLogin">
                    <img src={backIcon} alt="Voltar" />
                </Link>

                <main>
                    <h1>Cadastro</h1>
                    <p>
                        Preencha os dados abaixo para começar.
                    </p>
                    <form onSubmit={handleRegister}>
                        <AuthInput
                            name="nome"
                            placeholder="Nome"
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

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

                        <AuthSelect
                            name="subject"
                            value={profile}
                            onChange={(e) => setProfile(e.target.value)}
                            options={[
                                { value: 'Aluno', label: 'Aluno' },
                                { value: 'Professor', label: 'Professor' },
                            ]}
                        />

                        <button type="submit">Concluir cadastro</button>
                    </form>

                </main>
            </div>

            <div className="proffy-board">
                <img src={Logo} alt="" className="register-logo" />
                <div className="register-background" style={{ backgroundImage: `url(${Background})` }} />
                <p>
                    Sua plaforma de estudos online.
                </p>
            </div>
        </div>
    );
}

export default Register;