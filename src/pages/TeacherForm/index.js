import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const { user } = useAuth();

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

        const course = {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            teacher : {
                name: user.name,
                username: user.username,
                password: user.password,
                profile: user.profile
            }
        }

        api.post("/courses", course).then(response => {
            history.push('/curses');
        })
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
                title="Que incrível que você quer dar cursos."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Primeiro passo</legend>

                        <Input 
                            name="name" 
                            label="Nome do Curso" 
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
                            onChange={(e) => {setWhatsapp(e.target.value)}}
                        />

                        <TextArea 
                            name="biografia" 
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Segundo passo</legend>
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
                            label="Valor do curso"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários de Atendimento
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

export default TeacherForm;