import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader';

import './styles.css';

const VideoPlayer = ({ url, close, positionY }) => {
    return (
        <div className="video-player-container" style={{ top: positionY }}>
            <button className="close-video-player" onClick={close}>X</button>
            <iframe className="video-player"
                src={url}>
            </iframe>
        </div>
    )
}

function WatchClasses() {
    const mockData = [
        {
            title: "ReactJs é melhor que VueJs",
            url: "https://www.youtube.com/embed/tgbNymZ7vqY"
        },
        {
            title: "Introdução ao ReactJs",
            url: "https://www.youtube.com/embed/tgbNymZ7vqY"
        },
        {
            title: "Construindo o primeiro componente",
            url: "https://www.youtube.com/embed/tgbNymZ7vqY"
        },
        {
            title: "Utilizando props no ReactJs",
            url: "https://www.youtube.com/embed/tgbNymZ7vqY"
        },
        {
            title: "Gerenciando os estados com Redux",
            url: "https://www.youtube.com/embed/tgbNymZ7vqY"
        },
        {
            title: "Construindo o projeto final",
            url: "https://www.youtube.com/embed/tgbNymZ7vqY"
        }
    ]

    const [classes, setClasses] = useState(mockData);
    const [player, setPlayer] = useState(false);
    const [url, setUrl] = useState("");

    const handleWatchClass = (url) => {
        document.body.style.overflow = "hidden";
        setUrl(url);
        setPlayer(true);
    }

    const handleClosePlayer = () => {
        document.body.style.overflow = "visible";
        setPlayer(false);
    }

    return (
        <div id="page-classes-list" className="container">
            {player && <VideoPlayer url={url} close={handleClosePlayer} positionY={window.pageYOffset} />}
            <PageHeader
                title="Estas são as aulas disponíveis."
                description="Fique a vontade para assisti-las ou realizar o download."
            />
            <main>
                <h1 style={{ textAlign: "center" }}>Curso do Samu</h1>

                {
                    classes.length > 0 ? <ul className="class-list">
                        {
                            classes.map((classObject) => {
                                return (
                                    <li className="class-item">
                                        <span className="class-title">{classObject.title}</span>
                                        <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <a className="class-url-download" href={classObject.url} target="_blank">Download</a>
                                            <button onClick={() => handleWatchClass(classObject.url)} className="class-url-watch" href={classObject.url} target="_blank">Assistir Aula</button>
                                        </span>

                                    </li>
                                )
                            })
                        }
                    </ul>
                        : <h1 style={{ textAlign: "center", padding: 50 }}>
                            Ainda não há aulas disponíveis para esse curso
                            <br />
                            :(
                        </h1>
                }
            </main>
        </div>
    )
}

export default WatchClasses;