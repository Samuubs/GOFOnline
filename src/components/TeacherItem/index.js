import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import whastappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

const TeacherItem = ({ teacher }) => {
  const history = useHistory();

  function createNewConnection() {
    api.post('/connections');
  }

  const { user } = useAuth();

  function handleSubscribe(e) {
    e.preventDefault();

    const subscribe = {
      courseId: teacher.id,
      studentUsername: user.username,
    }

    api.post("/subscriptions", subscribe).then(response => {
      if (response.status === 200) {
        alert("Matricula realizada com sucesso!")
        history.push('/');
      } else {
        alert("Erro ao realizar matricula!");
      }
    })
  }

  const BuyIcon = () => {
    return (
      <svg style={{marginRight: 12}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="#FFF" d="M10 20.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.305-15l-3.432 12h-10.428l-3.777-9h-2.168l4.615 11h13.239l3.474-12h1.929l.743-2h-4.195zm-5.805 0h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2zm0 5h-6v2h6v-2zm0 3h-6v2h6v-2z"/>
      </svg>
    )
  }
  
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>
        {teacher.bio}
      </p>
      <footer>
        <p>
          Preço
          <strong>
            R$
            {teacher.cost}
          </strong>
        </p>
        <a 
          target="_blank" 
          onClick={createNewConnection} 
          href={`https://wa.me/${teacher.whatsapp}`} 
          type="button"
        >
          <img src={whastappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
        <button className="buy-curse" onClick={handleSubscribe}><BuyIcon/>Comprar</button>
      </footer>
    </article>
  );
}

export default TeacherItem;