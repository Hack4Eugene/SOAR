import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './global.scss';

import Header from './components/global/Header';

import ProjectFeed from './components/pages/ProjectFeed';
import EventFeed from './components/pages/EventFeed';
import AddEvent from './components/pages/AddEvent';
import Project from './components/Project';
import LoginPage from './components/pages/LoginPage';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mr-3 ml-3">
                    <Switch>
                        <Route path="/" exact component={ProjectFeed} />
                        <Route path="/events" component={EventFeed} />
                        <Route path="/addevent" component={AddEvent} />
                        <Route path="/projects/:id" component={Project} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
