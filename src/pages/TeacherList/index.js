import React, { useState, FormEvent, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function TeacherList() {
  const mockData = [
      {
          name: "Curso 1", 
          avatar: "https://avatars1.githubusercontent.com/u/33751384?s=460&u=bba99304003d18646b6e4ed1152f02a23f00d081&v=4", 
          whatsapp: 33133131,
          bio: "Melhor curso da plataforma de longe!", 
          subject: "Fisica",
          cost: 80,
          id: 1
      },
      {
          name: "Curso 2", 
          avatar: "https://avatars3.githubusercontent.com/u/32658656?s=460&u=ecbdacd46202567458a58d4484a168edf91eac22&v=4", 
          whatsapp: 33133131,
          bio: "Curso ruim, não vale a pena", 
          subject: "Biologia",
          cost: 1,
          id: 2
      }
  ]

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState(mockData);

//   useEffect(() => {
//     // Fazer requisiçao para buscar todos os professores
//     api.get('classes').then(response => {
//         const {teachers} = response.data;
//         setTeachers(teachers);
//     })
//   }, []);

  async function searchTeachers(e) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os cursos disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
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
            name="time" 
            label="Horário de atendimento" 
            type="time" 
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      {teachers.length > 0 ? (
        <main>
            {teachers.map((teacher) => {
                return <TeacherItem key={teacher.id} teacher={teacher} />
            })}
        </main>
      ) : (
          <main>
            <p className="no-search">
                Não há professores disponíveis! :(
            </p>
          </main>
      )}
    </div>
  );
}

export default TeacherList;