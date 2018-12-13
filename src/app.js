import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './global.scss';

import Header from './views/global/Header';

import ProjectFeed from './views/components/Feeds/ProjectFeed';
import EventFeed from './views/components/Feeds/EventFeed';
import Event from './views/pages/Event';
import AddEvent from './views/pages/AddEvent';
import AddProject from './views/pages/AddProject';
import ExploreFeed from './views/components/Feeds/ExploreFeed';
import AddOrganization from './views/pages/AddOrganization';
import AddUser from './views/pages/AddUser';
import LoginPage from './views/pages/Login';
import ProfilePage from './views/pages/UserProfile';
import ProjectPage from './views/pages/Project';
import PrivateRoute from './views/hoc/requireAuth';
import OrganizationPage from './views/pages/Organization';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mr-3 ml-3 mt-4 site-body">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/adduser" component={AddUser} />
                        <PrivateRoute path="/logout" component={() => <LoginPage expireSession />} />
                        <PrivateRoute path="/" exact component={ProjectFeed} />
                        <PrivateRoute path="/events" component={EventFeed} />
                        <PrivateRoute path="/event/:id" component={Event} />
                        <PrivateRoute path="/explore" component={ExploreFeed} />
                        <PrivateRoute path="/addevent" component={AddEvent} />
                        <PrivateRoute path="/addproject" component={AddProject} />
                        <PrivateRoute path="/addorganization" component={AddOrganization} />
                        <PrivateRoute path="/organization/:id" component={OrganizationPage} />
                        <PrivateRoute path="/profile" component={ProfilePage} />
                        <PrivateRoute path="/profile" component={OrganizationPage} />
                        <PrivateRoute path="/project/:id" component={ProjectPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
