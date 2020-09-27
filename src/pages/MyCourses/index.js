import React, { useState, FormEvent, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import CurseItem, {Curse} from '../../components/CurseItem';
import { useAuth } from '../../contexts/auth';

import './styles.css';

function MyCourses() {
    const mockData = [
        {
            name: "Curso 1", 
            avatar: "https://avatars1.githubusercontent.com/u/33751384?s=460&u=bba99304003d18646b6e4ed1152f02a23f00d081&v=4", 
            whatsapp: 33133131,
            bio: "O brabo", 
            subject: "Biologia",
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
  
    const [curses, setCurses] = useState(mockData);

    const { user } = useAuth();
  
    useEffect(() => {
        // Fazer requisiçao para buscar todos os professores
        //   api.get('classes').then(response => {
        //       const {teachers} = response.data;
        //       setTeachers(teachers);
        //   })
    }, []);
  
    async function searchTeachers(e) {
      e.preventDefault();
  
    //   const response = await api.get('classes', {
    //     params: {
    //       subject,
    //       week_day: weekDay,
    //       time,
    //     },
    //   });
  
    //   setTeachers(response.data);
    }
    
    const finalDescription = user?.profile === "Professor" ? "Aqui você pode gerenciar seus cursos!" : "Aqui você pode ver os cursos matriculados!";
    return (
      <div id="page-teacher-list" className="container">
        <PageHeader title="Estes são seus cursos" description={finalDescription}/>
  
        {curses.length > 0 ? (
          <main>
              {curses.map((curses) => {
                  return <CurseItem key={curses.id} curse={curses} />
              })}
          </main>
        ) : (
            <main>
              <p className="no-search">
                  Não há cursos no momento! :(
              </p>
            </main>
        )}
      </div>
    );
}

export default MyCourses;