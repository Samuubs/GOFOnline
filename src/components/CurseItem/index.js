import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
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
            Preço
            <strong>
                R$
                {curse.cost}
            </strong>
            </p>
            {
                user?.profile === "TEACHER" && <Link className="curse-edit" to={{ pathname: '/edit-course', state: { curse }}}> 
                    Editar 
                </Link>
            }

            {
                user?.profile === "TEACHER" ?               
                <Link to={{ pathname: '/add-classes', state: { curse }}} className="curse-add-class">
                    Adicionar Aulas
                </Link>
                :
                <Link to={{ pathname: "/watch-classes", state: { curse }}} className="curse-add-class">
                    Assistir Aulas
                </Link>
            }
        </footer>
        </article>
    );
}

export default CurseItem;