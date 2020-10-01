import React, { useState, FormEvent } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

function EditCourse(props) {
    const [name, setName] = useState(props.location.state.curse?.name);
    const [avatar, setAvatar] = useState(props.location.state.curse?.avatar);
    const [bio, setBio] = useState(props.location.state.curse?.bio);
    const [whatsapp, setWhatsapp] = useState(props.location.state.curse?.whatsapp);

    const [subject, setSubject] = useState(props.location.state.curse?.subject);
    const [cost, setCost] = useState(props.location.state.curse?.cost);

    const [scheduleItems, setScheduleItems] = useState(
        [
            { week_day: '0', from: '', to: '' },
        ]
    )

    function addNewScheduleItem () {
        setScheduleItems([
            ...scheduleItems,
            { week_day: '0', from: '', to: '' },
        ]);
    }

    function handleCreateClass (e) {
        e.preventDefault();

        const curse = {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }

        console.log(curse);

        // api.post('classes', {
        //     name,
        //     avatar,
        //     whatsapp,
        //     bio,
        //     subject,
        //     cost: Number(cost),
        //     schedule: scheduleItems,
        //   }).then(() => {
        //     alert('Aula cadastrada com sucesso!');
      
        //     history.push('/');
        //   }).catch(() => {
        //     alert('Erro no cadastro.');
        //   });
    }

    function setScheduleItemValue (position, field, value) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}} 
                        />

                        <Input 
                            name="avatar" 
                            label="Avatar" 
                            value={avatar} 
                            onChange={(e) => {setAvatar(e.target.value)}} 
                        />

                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            value={whatsapp} 
                            onChange={(e) => {setWhatsapp(parseInt(e.target.value))}}
                        />

                        <TextArea 
                            name="biografia" 
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Química', label: 'Química' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Inglês', label: 'Inglês' },
                            ]}
                        />

                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(parseInt(e.target.value))}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week-day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => {setScheduleItemValue(index, 'week_day', e.target.value)}}
                                        options={[
                                                { value: '0', label: 'Domingo' },
                                                { value: '1', label: 'Segunda-feira' },
                                                { value: '2', label: 'Terça-feira' },
                                                { value: '3', label: 'Quarta-feira' },
                                                { value: '4', label: 'Quinta-feira' },
                                                { value: '5', label: 'Sexta-feira' },
                                                { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={(e) => {setScheduleItemValue(index, 'from', e.target.value)}}
                                    />

                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={(e) => {setScheduleItemValue(index, 'to', e.target.value)}}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar curso</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default EditCourse;