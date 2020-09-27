import React, { FormEvent, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import api from "../../services/api";
import Background from '../../assets/images/background.svg';

import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import Logo from '../../assets/images/logo-purple.png';
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
        // @ts-ignore
        if (newClasses.forEach !== undefined ) {
            // @ts-ignore
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
            <main>
                <form onSubmit={handleUpload}>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Input
                            name="nome"
                            label="Titulo da aula"
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="dropfile">
                            <Dropzone onDropAccepted={(files) => { setClasses(files) }}>
                                {({ getRootProps, getInputProps }) => (
                                    <div className="upload" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Arraste arquivos ou clique aqui</p>
                                    </div>
                                )}
                            </Dropzone>
                        </legend>
                    </fieldset>

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