import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './views/components/Navbar';
import OrganizationFeed from './views/components/Feeds/OrganizationFeed';
import ProjectFeed from './views/components/Feeds/ProjectFeed';
import EventFeed from './views/components/Feeds/EventFeed';
import EventPage from './views/pages/Event';
import AddEvent from './views/pages/AddEvent';
import AddProject from './views/pages/AddProject';
import ExplorePage from './views/pages/Explore';
import AddOrganization from './views/pages/AddOrganization';
import AddUser from './views/pages/AddUser';
import LoginPage from './views/pages/Login';
import ProfilePage from './views/pages/User';
import ProjectPage from './views/pages/Project';
import PrivateRoute from './views/components/PrivateRoute';
import OrganizationPage from './views/pages/Organization';
import Lander from './views/pages/Lander';

import './global.scss';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <div className="site-content">
                    <Switch>
                        <Route path="/" exact component={Lander} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/adduser" component={AddUser} />
                        <PrivateRoute path="/logout" component={() => <LoginPage expireSession />} />
                        <PrivateRoute path="/projects" component={ProjectFeed} />
                        <PrivateRoute path="/events" component={EventFeed} />
                        <PrivateRoute path="/organizations" component={OrganizationFeed} />
                        <PrivateRoute path="/event/:id" component={EventPage} />
                        <PrivateRoute path="/explore" component={ExplorePage} />
                        <PrivateRoute path="/addevent" component={AddEvent} />
                        <PrivateRoute path="/addproject" component={AddProject} />
                        <PrivateRoute path="/addorganization" component={AddOrganization} />
                        <PrivateRoute path="/organization/:id" component={OrganizationPage} />
                        <PrivateRoute path="/profile" component={ProfilePage} />
                        <PrivateRoute path="/profile" component={OrganizationPage} />
                        <PrivateRoute path="/project/:id" component={ProjectPage} />
                    </Switch>
                </div>
            </Fragment>
        );
    }
}

export default App;
