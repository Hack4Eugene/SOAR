import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './global.scss';

import Header from './components/global/Header';

import ProjectFeed from './components/pages/ProjectFeed';
import EventFeed from './components/pages/EventFeed';
import AddEvent from './components/pages/AddEvent';
import ExploreFeed from './components/pages/ExploreFeed';
import AddOrganization from './components/pages/AddOrganization';
import AddUser from './components/pages/AddUser';
import Project from './components/Project';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/UserProfilePage';
import ProjectPage from './components/pages/ProjectPage';
import UserProfilePage from './components/pages/UserProfilePage';
import PrivateRoute from './components/hoc/requireAuth';
import OrganizationPage from './components/pages/OrganizationPage';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mr-3 ml-3">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/logout" component={() => <LoginPage expireSession={true} />} />
                        <PrivateRoute path="/" exact component={ProjectFeed} />
                        <PrivateRoute path="/events" component={EventFeed} />
                        <PrivateRoute path="/explore" component={ExploreFeed} />
                        <PrivateRoute path="/addevent" component={AddEvent} />
                        <PrivateRoute path="/addorganization" component={AddOrganization} />
                        <Route path="/adduser" component={AddUser} />
                        <PrivateRoute path="/projects/:id" component={Project} />
                        <PrivateRoute path="/profile" component={ProfilePage} />
                        <PrivateRoute path="/profile" component={OrganizationPage} />
                        <PrivateRoute path="/project" component={ProjectPage} />
                        <PrivateRoute path="/userprofile" component={UserProfilePage} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
