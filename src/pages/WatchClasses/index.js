import React from 'react'
import PageHeader from '../../components/PageHeader';

import './styles.css';

function WatchClasses() {
    const mockData = [
        {
            title: "ReactJs é melhor que VueJs",
            url: "https://www.youtube.com/watch?v=9gsAz6S_zSw"
        },
        {
            title: "Introdução ao ReactJs",
            url: "https://www.youtube.com/watch?v=9gsAz6S_zSw"
        },
        {
            title: "Construindo o primeiro componente",
            url: "https://www.youtube.com/watch?v=5abamRO41fE"
        },
        {
            title: "Utilizando props no ReactJs",
            url: "https://www.youtube.com/watch?v=5abamRO41fE"
        },
        {
            title: "Gerenciando os estados com Redux",
            url: "https://www.youtube.com/watch?v=5abamRO41fE"
        },
        {
            title: "Construindo o projeto final",
            url: "https://www.youtube.com/watch?v=5abamRO41fE"
        }
    ]

    return (
        <div id="page-classes-list" className="container">
            <PageHeader title="Estas são as aulas disponíveis."></PageHeader>
            <ul className="class-list">
                {
                    mockData.map((classObject) => {
                        return (
                            <li className="class-item">
                                <span className="class-title">{classObject.title}</span>
                                <a className="class-url" href={classObject.url} target="_blank">Assistir Aula</a>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default WatchClasses;