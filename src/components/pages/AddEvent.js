import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter, cloneDeep } from 'lodash';
import moment from 'moment';

import EventsWidget from '../EventsWidget'
import eventImg1 from '../../static/imgs/stock-event-1.jpg';

import Card from '../Card';
import Calendar from 'react-calendar';

import { addEventToProject } from '../../state/actions/index.js'

const mapStateToProps = (state) => ({
  events: get(state, 'events', {})
});

const submitEvent = () => {

}

class AddEvent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            newEvent: {
              name: '',
              eventDate: null,
              description: '',
              location: '',
              project: {
                id: '5ac9877976448030b88ac636',
                name: 'Winter Warmth Project'
              },
              tags: '',
              organization: {
                id: '5ac9877976448030b88ac636',
                name: 'FOOD for Lane County'
              },
              private: false
            }
        }
    }

    componentWillMount() {
      // this.props.addEventToProject()
    }

    submitEvent() {
      this.props.addEventToProject(JSON.stringify(this.state.newEvent))
    }

    handleFormInput(e) {
      const newState = cloneDeep(this.state.newEvent);
      switch(e.target.id) {
        case 'eventName':
          newState.name = e.target.value
          this.setState({newEvent: newState})
          break
        case 'eventDate':
          newState.eventDate = e.target.value
          this.setState({newEvent: newState})
          break
        case 'eventDescription':
          newState.description = e.target.value
          this.setState({newEvent: newState})
          break
        case 'eventLocation':
          newState.location = e.target.value
          this.setState({newEvent: newState})
          break
        // case 'eventProject':
        //   this.setState({ newEvent: {...this.state.newEvent, project: e.target.value} })
        case 'eventTags':
          newState.tags = e.target.value
          this.setState({newEvent: newState})
          break
        case 'eventPrivate':
          newState.private = e.target.checked
          this.setState({newEvent: newState})
          break
      }
    }

    renderForm() {
      return (
        <Card>
          <div className="card-body">
            {/* <form> */}
              <div className="form-group">
                <label for="eventName">Title</label>
                <input type="text" className="form-control" id="eventName" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="eventDate">Date</label>
                <input type="datetime-local" className="form-control" id="eventDate" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="eventDescription">Description</label>
                <textarea type="text" className="form-control" id="eventDescription" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="eventLocation">Location</label>
                <input type="text" className="form-control" id="eventLocation" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="eventProject">Project</label>
                <select className="form-control" id="eventProject" onChange={(e) => this.handleFormInput(e)}>
                  <option>Select Project</option>
                  <option>Fall Food Initiative</option>
                  <option>Winter Warmth Project</option>
                </select>
              </div>
              <div className="form-group">
                <label for="eventTags">Tags</label>
                <input type="text" className="form-control" id="eventTags" placeholder="Enter a comma separated list..." onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-check form-group">
                <input className="form-check-input" type="checkbox" id="eventPrivate" onChange={(e) => this.handleFormInput(e)}/>
                <label className="form-check-label" for="eventPrivate">
                  Private Event
                </label>
              </div>
              <button className="btn btn-primary" onClick={this.submitEvent.bind(this)}>Submit</button>
            {/* </form> */}
          </div>
      </Card>
      )
    }

    render() {
      return(
          <div className="container">                    
              <div className="row justify-content-center">
                  <div className="col-5">
                    <h2 className="ml-3">Add Event</h2>
                  </div>
                  <div className="col-3">
                    <Link to="/events">
                      <button type="button" 
                              className="btn btn-success float-right" 
                              data-toggle="modal" 
                              data-target="#exampleModal">
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
        )
    }
}

export default connect(mapStateToProps, { addEventToProject })(AddEvent);
