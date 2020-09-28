import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import Dropzone from 'react-dropzone';

import { useDropzone } from 'react-dropzone'
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";

function UploadClasses(props) {
    const history = useHistory();

    // const [newClasses, setClasses] = useState([]);
    const [newClasses, setClasses] = useState({});
    const [title, setTitle] = useState('');

    const handleUpload = (e) => {
        e.preventDefault();
        if (newClasses.forEach !== undefined) {
            newClasses.forEach(file => {
                const formData = new FormData();
                // const { id } = this.props.match.params;
                console.log(title);
                console.log(file);

                formData.append('file', file);

                // api.post(`boxes/${id}/files`, formData);
            });
        } else {
            alert('Preencha todos os dados!');
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
                        <Dropzone onDrop={acceptedFiles => setClasses(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="upload">
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Arraste arquivos ou clique aqui</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
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