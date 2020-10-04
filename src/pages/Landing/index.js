import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const [semanalConnections, setSemanalConnections] = useState(0);
  const [rank, setRank] = useState([]);

  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get(`/courses/rank/${10}`).then(response => {
      const coursesRank = response.data;
      let coursesStudents = [];
      let coursesNames = [];

      for (let i = 0; i < coursesRank.length; i++) {
        coursesNames.push(coursesRank[i].name);
        coursesStudents.push(coursesRank[i].students.length);
      }

      const rankFinal = [coursesNames, coursesStudents];
      setRank(rankFinal);
    })
  }, []);

  useEffect(() => {
    api.get('/connections/per-day-of-week').then(response => {
      const connectionsPerWeek = response.data;
      const connectionsPerWeekFinal = Object.values(connectionsPerWeek);
      setSemanalConnections(connectionsPerWeekFinal);
    })
  }, []);

  const renderButtonByProfile = () => {
    if (user?.profile === "TEACHER") {
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
    labels: rank[0],
    datasets: [
      {
        label: 'Alunos',
        backgroundColor: '#9871F5',
        borderColor: '#6842C2',
        borderWidth: 1,
        hoverBackgroundColor: '#9871F5',
        hoverBorderColor: '#9871F5',
        data: rank[1]
      }
    ]
  };

  const dataSemanalConections = {
    labels: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-Feira', 'Sábado'],
    datasets: [
      {
        label: 'Conexões',
        backgroundColor: 'transparent',
        borderColor: '#6842C2',
        borderWidth: 1,
        hoverBackgroundColor: '#9871F5',
        hoverBorderColor: '#9871F5',
        data: semanalConnections
      }
    ]
  };

  const lineChartTopCurses = () => {
    return (
      <div style={{ marginBottom: 24, textAlign: "center" }}>
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
      <div style={{ marginBottom: 24, textAlign: "center" }}>
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

  const avatar = () => {
    if (user?.profile === "TEACHER") {
      return (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
          <path fill="#FFF" d="M16 24h-6v-1c0-1.105.895-2 2-2h2c.53 0 1.039.211 1.414.586s.586.884.586 1.414v1zm8 0h-6v-1c0-1.105.895-2 2-2h2c.53 0 1.039.211 1.414.586s.586.884.586 1.414v1zm-17.241-15c.649 0 1.293-.213 1.692-.436.755-.42 2.695-1.643 3.485-2.124.216-.131.495-.083.654.113l.008.011c.165.204.146.499-.043.68-.622.597-2.443 2.328-3.37 3.213-.522.499-.822 1.183-.853 1.904-.095 2.207-.261 6.912-.331 8.833-.017.45-.387.806-.837.806h-.001c-.444 0-.786-.347-.836-.788-.111-.981-.329-3.28-.426-4.212-.04-.384-.28-.613-.585-.615-.304-.001-.523.226-.549.609-.061.921-.265 3.248-.341 4.22-.034.442-.397.786-.84.786h-.001c-.452 0-.824-.357-.842-.808-.097-2.342-.369-8.964-.369-8.964l-1.287 2.33c-.14.253-.445.364-.715.26h-.001c-.279-.108-.43-.411-.349-.698l1.244-4.393c.122-.43.515-.727.962-.727h4.531zm6.241 7c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm8 0c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm3-1h-15v-1h8v-1h3v1h3v-13h-22v7l-1 2.745v-10.745h24v15zm-6-6h-4v-1h4v1zm-12.626-5c1.241 0 2.25 1.008 2.25 2.25s-1.009 2.25-2.25 2.25c-1.242 0-2.25-1.008-2.25-2.25s1.008-2.25 2.25-2.25zm15.626 3h-7v-1h7v1zm0-2h-7v-1h7v1z" />
        </svg>
      )
    }
    return (
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path fill="#FFF" d="M12.5 17.52c1.415-1.054 3.624-1.846 5.5-2v6.479c-1.739.263-3.755 1.104-5.5 2v-6.479zm-1 0c-1.415-1.054-3.624-1.846-5.5-2v6.479c1.739.263 3.755 1.104 5.5 2v-6.479zm-6.5 2.917c-2.049-.674-2.996-1.437-2.996-1.437l-.004-2.025c-.008-2.127.088-3.344 2.648-3.909 2.805-.619 5.799-1.317 4.241-3.521-3.901-5.523-.809-9.545 3.111-9.545 3.921 0 6.996 3.991 3.11 9.545-1.529 2.185 1.376 2.888 4.242 3.521 2.57.568 2.657 1.791 2.647 3.934l-.003 2s-.947.763-2.996 1.437v-6.003l-1.082.089c-2.054.169-4.36 1.002-5.918 2.128-1.559-1.126-3.863-1.959-5.918-2.128l-1.082-.089v6.003z" />
      </svg>
    )
  }

  return (
    <div>
      <div id="page-landing">
        <div className="user-header">
          <div className="user-profile">
            {avatar()}
            <h3>{user?.name}</h3>
          </div>
          <button onClick={signOut} style={{ cursor: "pointer", backgroundColor: "transparent", color: "#FFF", outline: "nome", border: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={logoutIcon} alt="sair" style={{ width: "24px", height: "24px", marginRight: "12px" }} />
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
        <Link to={{ pathname: '/reports', state: { semanalConnections, rank }}} className="button-reports" style={{marginBottom: 5, textDecoration: "none"}}>
          Ver Relatórios
        </Link>
      </div>
    </div>
  )
}

export default Landing;