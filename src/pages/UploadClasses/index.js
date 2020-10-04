import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import axios from 'axios';

import Dropzone from '../../components/Dropzone';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";

function UploadClasses(props) {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [course, setCourse] = useState(props.location.state.curse);
    const [selectedFile, setSelectedFile] = useState();

    const handleUpload = async (e) => {
        e.preventDefault();

        const classTitle = { title }

        if (title !== '' && selectedFile) {
            const response = await api.post(`/courses/${course.id}/classes`, classTitle);

            const url = response.data.url;
            try {
                await axios({
                    method: 'put',
                    url,
                    data: selectedFile,
                    headers: {
                        "Content-Type": `video/mp4`,
                    }
                })

                history.push('/curses');
            } catch (error) {
                console.log(error)
            }        
        } else {
            alert("Preencha todos os dados!")
        }
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="Faça o upload dos arquivos da aula para seus alunos!"
            />
            <main className="a">
                <form onSubmit={handleUpload}>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Input
                            name="nome"
                            label="Titulo da aula"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </fieldset>

                    <div className="dropfile">
                        <Dropzone onFileUploaded={setSelectedFile} />
                    </div>

                    <div>
                        <h2 style={{ textAlign: "center", marginTop: 20 }}>Arquivo Selecionado</h2>
                        {selectedFile ? (
                            <ul className="class-list">
                                <li className="class-item">
                                    <span style={{maxWidth: 300}}>{selectedFile.name}</span>
                                    <span>{ (selectedFile.size / (1024*1024)).toFixed(2)}MB</span>
                                </li>
                            </ul>
                        ) : 
                        <p style={{textAlign: "center", color: "#ccc", padding: 24}}>Nenhum arquivo ainda.</p>
                        }
                    </div>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Enviar aula</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default UploadClasses;