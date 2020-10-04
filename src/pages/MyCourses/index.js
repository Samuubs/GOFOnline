import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import CurseItem from '../../components/CurseItem';
import { useAuth } from '../../contexts/auth';

import './styles.css';

const Loading = () => {
  return (
    <div className="loader" style={{marginTop: "5%"}}>
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

function MyCourses() {
  const [curses, setCurses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (user.profile === "TEACHER") {
      api.get(`/courses?teacherUsername=${user.username}`).then(response => {
        setCurses(response.data);
        setLoading(false);
      })
    } else {
      api.get(`/users/${user.username}`).then(response => {
        setCurses(response.data.courses);
        setLoading(false);
      })
    }
  }, []);

  const finalDescription = user?.profile === "TEACHER" ? "Aqui você pode gerenciar seus cursos!" : "Aqui você pode ver os cursos matriculados!";
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são seus cursos." description={finalDescription} />
      {
        loading ? <Loading /> :
          curses.length > 0 ? (
            <main>
              {curses.map((curse) => {
                return <CurseItem key={curse.id} curse={curse} />
              })}
            </main>
          ) : (
              <main>
                <p className="no-search">
                  Não há cursos no momento! :(
            </p>
              </main>
            )
      }
    </div>
  );
}

export default MyCourses;