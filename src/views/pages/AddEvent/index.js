import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, cloneDeep } from 'lodash';

import Card from '../../lib/Card';
// import eventImg1 from '../../../static/imgs/stock-event-1.jpg';

import { createEvent } from '../../../state/actions/eventActions';

const mapStateToProps = (state) => ({
  events: get(state, 'events', {})
});

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEvent: {
              name: '',
              eventDate: null,
              description: '',
              location: '',
              project: '5ae12bfd0d894102c483e886',
              tags: '',
              organization: '5ac9877976448030b88ac636',
              goals: [],
              private: false
            }
        };
    }

    submitEvent() {
      this.props.createEvent(this.state.newEvent);
    }

    handleFormInput(e) {
      const newState = cloneDeep(this.state.newEvent);
      switch (e.target.id) {
        case 'eventName':
          newState.name = e.target.value;
          this.setState({ newEvent: newState });
          break;
        case 'eventDate':
          newState.eventDate = e.target.value;
          this.setState({ newEvent: newState });
          break;
        case 'eventDescription':
          newState.description = e.target.value;
          this.setState({ newEvent: newState });
          break;
        case 'eventLocation':
          newState.location = e.target.value;
          this.setState({ newEvent: newState });
          break;
        // case 'eventProject':
        //   this.setState({ newEvent: {...this.state.newEvent, project: e.target.value} })
        case 'eventTags':
          newState.tags = e.target.value.split(',');
          this.setState({ newEvent: newState });
          break;
        case 'eventGoals':
          const goalArray = e.target.value.split(',');
          newState.goals = goalArray.map(goal => ({
              text: goal,
              completed: false
          }));

          this.setState({ newEvent: newState });
          break;
        case 'eventPrivate':
          newState.private = e.target.checked;
          this.setState({ newEvent: newState });
          break;
          default:
              break;
      }
    }

    renderForm() {
      return (
        <Card>
          <div className="card-body">
            {/* <form> */}
              <div className="form-group">
                <label htmlFor="eventName">Title</label>
                <input type="text" className="form-control" id="eventName" onChange={(e) => this.handleFormInput(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Date</label>
                <input type="datetime-local" className="form-control" id="eventDate" onChange={(e) => this.handleFormInput(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="eventDescription">Description</label>
                <textarea className="form-control" id="eventDescription" onChange={(e) => this.handleFormInput(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="eventLocation">Location</label>
                <input type="text" className="form-control" id="eventLocation" onChange={(e) => this.handleFormInput(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="eventProject">Project</label>
                <select className="form-control" id="eventProject" onChange={(e) => this.handleFormInput(e)}>
                  <option>Select Project</option>
                  <option>Fall Food Initiative</option>
                  <option>Winter Warmth Project</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="eventTags">Tags</label>
                <input
                    type="text"
                    className="form-control"
                    id="eventTags"
                    placeholder="Enter a comma separated list..."
                    onChange={(e) => this.handleFormInput(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventGoals">Goals</label>
                <input
                    type="text"
                    className="form-control"
                    id="eventGoals"
                    placeholder="Enter a comma separated list..."
                    onChange={(e) => this.handleFormInput(e)}
                />
              </div>
              <div className="form-check form-group">
                <input className="form-check-input" type="checkbox" id="eventPrivate" onChange={(e) => this.handleFormInput(e)} />
                <label className="form-check-label" htmlFor="eventPrivate">
                  Private Event
                </label>
              </div>
              <button className="btn btn-primary" onClick={() => this.submitEvent()}>Submit</button>
            {/* </form> */}
          </div>
      </Card>
      );
    }

    render() {
      return (
          <div className="container">                    
              <div className="row justify-content-center">
                  <div className="col-5">
                    <h2 className="ml-3">Add Event</h2>
                  </div>
                  <div className="col-3">
                    <Link to="/events">
                      <button
type="button" 
                              className="btn btn-success float-right" 
                              data-toggle="modal" 
                              data-target="#exampleModal"
                      >
                              Back to Events
                      </button>
                    </Link>
                  </div>
              </div>
              <div className="row justify-content-center">
                  <div className="col-8">
                    {this.renderForm()}          
                  </div>                  
              </div>
          </div>
        );
    }
}

export default connect(mapStateToProps, { createEvent })(AddEvent);
