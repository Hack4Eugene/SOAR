import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

import EventFeed from '../../components/Feeds/EventFeed';
import ProjectFeed from '../../components/Feeds/ProjectFeed';
import OrganizationFeed from '../../components/Feeds/OrganizationFeed';
import { getOrganizations } from '../../../state/actions/organizationActions';
import './Explore.scss';

const categoryHashes = [
    '#events', 
    '#projects', 
    '#organizations'
];

class Explore extends Component {
    constructor(props) {
        super(props);

        const category = categoryHashes.includes(props.location.hash)
            ? props.location.hash.replace('#', '')
            : 'events';

        this.state = {
            category
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.location.hash !== prevProps.location.hash) {
            const category = categoryHashes.includes(this.props.location.hash)
                ? this.props.location.hash.replace('#', '')
                : this.state.category;

            if (category !== this.state.category) {
                this.setState({ category })
            }
        }
    }

    renderAddButton() {
        let link, text;

        switch (this.state.category) {
            case 'events':
                link = '/addevent';
                text = 'Create new event';
                break;
            case 'projects':
                link = '/addproject';
                text = 'Create new project';
                break;
            case 'organizations':
                link = '/addorganization';
                text = 'Create new organization';
                break;
            default:
                break;
        }

        return (
            <Link to={link}>
                <Button 
                    variant="outline-success" 
                    className="create-new-button"
                >
                    {text}
                </Button>
            </Link>
        );
    }

    renderSearch() {
        return (
            <div className="search">
                <InputGroup>
                    <FormControl placeholder={`Search ${this.state.category}...`} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }

    renderFilter() {
        return (
            <div className="filter">
                <Card>
                    <Card.Header>
                        Tag filter
                    </Card.Header>
                    <Card.Body>
                        <h5>Tags</h5>
                        <Button 
                            variant="outline-secondary"
                            className="filter-button"
                        >
                            Apply filter
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    renderCategories() {
        const { category } = this.state;

        return (
            <div className="categories">
                <ButtonGroup>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => this.setState({ category: 'events' })}
                        active={category === 'events'}
                    >
                        Events
                    </Button>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => this.setState({ category: 'projects' })}
                        active={category === 'projects'}
                    >
                        Projects
                    </Button>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => this.setState({ category: 'organizations' })}
                        active={category === 'organizations'}
                    >
                        Organizations
                    </Button>
                </ButtonGroup>
            </div>
        );
    }

    renderSort() {
        return (
            <div className="sort">
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary">
                        Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Created</Dropdown.Item>
                        <Dropdown.Item>Updated</Dropdown.Item>
                        <Dropdown.Item>Alphabetical</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }

    renderFeed() {
        switch (this.state.category) {
            case 'events':
                return <EventFeed />
            case 'projects':
                return <ProjectFeed />
            case 'organizations':
                return <OrganizationFeed />
            default:
                break;
        }
    }

    render() {
        return (
            <div className="explore-page">
                <div className="side">
                    {this.renderAddButton()}
                    {this.renderSearch()}
                    {this.renderFilter()}
                </div>
                <div className="main">
                    <div className="categories-sort">
                        {this.renderCategories()}
                        {this.renderSort()}
                    </div>
                    <div className="feed">
                        {this.renderFeed()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    events: _.get(state, 'events', {}),
    projects: _.get(state, 'projects', {}),
    organizations: _.get(state, 'organizations', {}),
});

const mapDispatchToProps = {
    getOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
