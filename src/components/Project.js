import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import ProjectCard from './ProjectCard';

const mapStateToProps = (state) => ({
    projects: _.get(state, 'projects', [])
});

class Project extends Component {
    componentWillMount() {
        console.log(this.match)
    }

    render() {
        const {
            id,
            title,
            startDate,
            description,
            totalEvents,
            animationVal,
        } = this.props.projects[0];
        return (
            <ProjectCard
                title={title}
                startDate={`This project was started ${moment().diff(moment(startDate), 'days')} days ago`}
                link={<Link className="btn btn-primary" to={`projects/${id}`}>More Details</Link>}
            >
                <div className="row justify-content-end align-items-center">
                    <div className="col-3">
                        <ProgressBar
                            animationVal={animationVal}
                            totalEvents={totalEvents}
                        />
                    </div>
                    {eventsFinished && (
                        <div className="col-1">
                            <p className="m-0">{animationVal}/{totalEvents}</p>
                        </div>
                    )}
                </div>
                <p>{description}</p>
            </ProjectCard>
        )
    }
}

export default Project;

const ProgressBar = props => (
    <div className="progress">
        <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-success"
            role="progressbar"
            style={{ width: `${(props.animationVal/props.totalEvents)*100}%` }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
        />
    </div>
)