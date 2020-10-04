import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import './styles.css';

function Reports(props) {
    const history = useHistory();

    const [content, setContent] = useState(0);
    const [rank, setRank] = useState(props.location.state.rank);
    const [semanalConnection, setSemanalConnection] = useState(props.location.state.semanalConnections)

    const handleChangeContent = (content) => {
        switch (content) {
            case 0:
                return (
                    rank.length > 0 ? <ul className="class-list">
                        {
                            rank[0].map((classObject, index) => {
                                return (
                                    <li className="class-item">
                                        <span style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                            <span style={{marginRight: 15, fontSize: 24, color: "#8257E5"}}>{index + 1}º</span>
                                            <span className="class-title">{classObject}</span>
                                        </span>
                                        <span>{rank[1][index]}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                        : <h1 style={{ textAlign: "center", padding: 50 }}>
                            Ainda não há dados suficientes para esse relatório
                                <br />
                                :(
                            </h1>

                )
            case 1:
                return (
                    <ul className="class-list">
                        <li className="class-item">
                            <span>Domingo</span>
                            <span>{semanalConnection[0]}</span>
                        </li>

                        <li className="class-item">
                            <span>Segunda-feira</span>
                            <span>{semanalConnection[1]}</span>
                        </li>

                        <li className="class-item">
                            <span>Terça-feira</span>
                            <span>{semanalConnection[2]}</span>
                        </li>

                        <li className="class-item">
                            <span>Quarta-feira</span>
                            <span>{semanalConnection[3]}</span>
                        </li>

                        <li className="class-item">
                            <span>Quinta-feira</span>
                            <span>{semanalConnection[4]}</span>
                        </li>

                        <li className="class-item">
                            <span>Sexta-feira</span>
                            <span>{semanalConnection[5]}</span>
                        </li>

                        <li className="class-item">
                            <span>Sábado</span>
                            <span>{semanalConnection[6]}</span>
                        </li>
                    </ul>
                )
            default:
                return (
                    <h1>Erro ao carregar a página. <br /> Tente novamente mais tarde.</h1>
                );
        }
    }

    const buttonStyleRank = content === 0 ?
        { backgroundColor: "#8257E5", color: "#FFF", borderWidth: 0 } :
        { backgroundColor: "transparent", color: "#8257E5", borderWidth: 1, borderColor: "#8257E5" };

    const buttonStyleConnections = content === 0 ?
        { backgroundColor: "transparent", color: "#8257E5", borderWidth: 1, borderColor: "#8257E5" } :
        { backgroundColor: "#8257E5", color: "#FFF", borderWidth: 0 };

    return (
        <div id="page-reports" className="container">
            <PageHeader
                title="Veja os relatórios disponíveis."
                description="Nós somos uma plataforma transparente e confiamos em você!"
            />
            <main>
                <div className="nav-container">
                    <button className="nav-button" style={buttonStyleRank} onClick={() => handleChangeContent(setContent(0))}>Rank de Cursos</button>
                    <button className="nav-button" style={buttonStyleConnections} onClick={() => handleChangeContent(setContent(1))}>Conexões Semanais</button>
                </div>

                {handleChangeContent(content)}
            </main>
        </div>
    )
}

export default Reports;