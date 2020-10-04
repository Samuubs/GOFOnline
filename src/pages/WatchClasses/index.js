import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import './styles.css';

const VideoPlayer = ({ url, close, positionY }) => {
    return (
        <div className="video-player-container" style={{ top: positionY }}>
            <button className="close-video-player" onClick={close}>X</button>
            <video autoPlay className="video-player">
                <source src={url} type="video/mp4" />
            </video>
        </div>
    )
}

const Loading = () => {
    return (
        <div className="loader" style={{ margin: "6%" }}>
            <div className="circle-1 circle">
                <div className="circle-2 circle">
                    <div className="circle-3 circle">
                        <div className="circle-4 circle">
                        </div>
                    </div>
                </div>
            </div>
            <p className="loading-text">Carregando...</p>
        </div>
    )
}

function WatchClasses(props) {
    const [classes, setClasses] = useState([]);
    const [player, setPlayer] = useState(false);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const course = props.location.state.curse;
        setLoading(true);
        api.get(`/courses/${course.id}`).then(async (response) => {
            const classes = response.data.classes;
            setClasses(classes);
            setLoading(false);
        })
    }, [])

    const handleWatchClass = async (url) => {
        document.body.style.overflow = "hidden";
        const course = props.location.state.curse;
        const responseGet = await api.get(`/courses/${course.id}/classes/${url}`)
        setUrl(responseGet.data.url);
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
                <h1 style={{ textAlign: "center" }}>{props.location.state.curse.name}</h1>
                {loading ? <Loading /> : (
                    classes.length > 0 ? <ul className="class-list">
                        {
                            classes.map((classObject) => {
                                return (
                                    <li className="class-item" key={classObject.id}>
                                        <span className="class-title">{classObject.title}</span>
                                        <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <button onClick={() => handleWatchClass(classObject.id)} className="class-url-watch" href={classObject.url} target="_blank">Assistir Aula</button>
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
                )}
            </main>
        </div>
    )
}

export default WatchClasses;