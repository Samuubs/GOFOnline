import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import { WindMillLoading } from 'react-loadingg';

function TeacherRoute({ component: Component, ...rest }) {
    const { signed, loading, user } = useAuth();

    if (loading) {
        return (
            <div style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
               <WindMillLoading color="#00adb5" style={{}} size="default" speed={ 1 } />
           </div> 
        )
    }

    if (!Component) return null;
    const permission = user?.profile === "Aluno" && signed ? true : false;
    return (
      <Route
        {...rest}
        render={props =>
          permission ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

export default TeacherRoute;