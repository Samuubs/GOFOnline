import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyCurses from '../pages/MyCourses';
import EditCourses from '../pages/EditCourse';
import UploadClasses from '../pages/UploadClasses';
import WatchClasses from '../pages/WatchClasses';

import TeacherRoute from './TeacherRoute';
import GenericRoute from './GenericRoute';
import StudentRoute from './StudentRoute';

const Routes = () => {    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <GenericRoute path="/" exact component={Landing} />
                <GenericRoute path="/curses" component={MyCurses} />
                <StudentRoute path="/study" component={TeacherList} />
                <StudentRoute path="/watch-classes" component={WatchClasses} />
                <TeacherRoute path="/give-classes" component={TeacherForm} />
                <TeacherRoute path="/edit-course" component={EditCourses} />
                <TeacherRoute path="/add-classes" component={UploadClasses} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

