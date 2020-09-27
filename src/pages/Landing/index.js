import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import logoutIcon from '../../assets/images/icons/logout.svg';

import { useAuth } from '../../contexts/auth';

import './styles.css';
import api from '../../services/api';

import { Bar, Line } from 'react-chartjs-2';

function Landing() {
    const history = useHistory();
    const [totalConnections, setTotalConnections] = useState(0);

    const { user, signOut } = useAuth();

    // useEffect(() => {
    //     api.get('/connections').then(response => {
    //         const { total } = response.data;
    //         setTotalConnections(total);
    //     })
    // }, []);

    const renderButtonByProfile = () => {
        if (user?.profile === "Professor") {
            return (
                <div className="buttons-container">
                    <Link to="/curses" className="mainActionButton">
                        <img src={studyIcon} alt="Estudar" />
                        Gerenciar Cursos
                    </Link>

                    <Link to="/give-classes" className="secondaryActionButton">
                        <img src={giveClassesIcon} alt="Dar aulas" />
                        Registrar Curso
                    </Link>
                </div>
            )
        }
        return (
            <div className="buttons-container">
                <Link to="/study" className="mainActionButton">
                    <img src={studyIcon} alt="Estudar" />
                    Estudar
                </Link>

                <Link to="/curses" className="secondaryActionButton">
                    <img src={giveClassesIcon} alt="Dar aulas" />
                    Meus Cursos
                </Link>
            </div>
        )
    }

    const dataTopCurses = {
        labels: ['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4', 'Curso 5', 'Curso 6', 'Curso 7'],
        datasets: [
          {
            label: 'Alunos',
            backgroundColor: '#9871F5',
            borderColor: '#6842C2',
            borderWidth: 1,
            hoverBackgroundColor: '#9871F5',
            hoverBorderColor: '#9871F5',
            data: [100, 94, 80, 78, 71, 50, 42]
          }
        ]
    };

    const dataSemanalConections = {
        labels: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-Feira', 'Sábado', 'Domingo'],
        datasets: [
          {
            label: 'Conexões',
            backgroundColor: 'transparent',
            borderColor: '#6842C2',
            borderWidth: 1,
            hoverBackgroundColor: '#9871F5',
            hoverBorderColor: '#9871F5',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
    };

    const lineChartTopCurses = () => {
        return (
          <div style={{marginBottom: 24, textAlign: "center"}}>
              <h2>Cursos mais populares</h2>
              <Bar
                data={dataTopCurses}
                options={{
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
                width={550}
                height={500}
      
              />
            </div>
        )
    }

    const lineChartSemanalConections = () => {
        return (
            <div style={{marginBottom: 24, textAlign: "center"}}>
              <h2>Conexões na semana</h2>
              <Line
                data={dataSemanalConections}
                options={{
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
                width={550}
                height={500}    
              />
            </div>
        )
    }

    return (
        <div>
            <div id="page-landing">
                <div className="user-header">
                    <div className="user-profile">
                        <img src={user?.avatar} alt="" />
                        <h3>{user?.name}</h3>
                    </div>
                    <button onClick={signOut} style={{cursor: "pointer", backgroundColor: "transparent", color: "#FFF", outline: "nome", border: 0, display: "flex", alignItems: "center", justifyContent: "center"}}>
                      <img src={logoutIcon} alt="sair" style={{width: "24px", height: "24px", marginRight: "12px"}}/>
                      Sair
                    </button>
                </div>
                <div id="page-landing-content" className="container">
                    <div className="logo-container">
                        <img src={logoImg} alt="Proffy" width={350} />
                        <h2>Sua plataforma de estudos online.</h2>
                    </div>

                    <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />

                    {renderButtonByProfile()}

                    {/* <span className="total-connections">
                        Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
                    </span> */}

                </div>
                <div className="scroll-down-container">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <span className="text">Role para baixo</span>
                </div>
            </div>
            <div className="chart-content">
                <h1>Gráficos</h1>
                <div className="charts">
                    {lineChartTopCurses()}
                    {lineChartSemanalConections()}
                </div>
            </div>
        </div>
    )
}

export default Landing;