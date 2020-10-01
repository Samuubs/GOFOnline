import React, { useState, FormEvent, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

const Loading = () => {
  return (
    <div className="loader" style={{ marginTop: "6%" }}>
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

function TeacherList() {
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    setLoading(true);
    api.get("/courses").then(response => {
      console.log(response.data);
      setTeachers(response.data);
      setLoading(false);
    })
  }, []);

  async function searchTeachers(e) {
    e.preventDefault();

    // const response = await api.get('classes', {
    //   params: {
    //     subject,
    //     week_day: weekDay,
    //     time,
    //   },
    // });

    // setTeachers(response.data);
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

      {
        loading ? <Loading /> :
          teachers.length > 0 ? (
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
            )
      }
    </div>
  );
}

export default TeacherList;