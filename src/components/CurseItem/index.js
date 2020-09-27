import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

const CurseItem = ({ curse }) => {
    const { user } = useAuth();
    
    return (
        <article className="curse-item">
        <header>
            <img src={curse.avatar} alt={curse.name} />
            <div>
            <strong>{curse.name}</strong>
            <span>{curse.subject}</span>
            </div>
        </header>
        <p>
            {curse.bio}
        </p>
        <footer>
            <p>
            Preço/hora
            <strong>
                R$
                {curse.cost}
            </strong>
            </p>

            {
                user?.profile === "Professor" && <Link className="curse-edit" to={{ pathname: '/edit-course', state: { curse }}}> 
                    Editar 
                </Link>
            }

            {
                user?.profile === "Professor" ?               
                <Link to={{ pathname: '/add-classes', state: { curse }}} className="curse-add-class">
                    Adicionar Aulas
                </Link>
                :
                <Link to="/watch-classes" className="curse-add-class">
                    Assistir Aulas
                </Link>
            }
        </footer>
        </article>
    );
}

export default CurseItem;