import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter } from 'lodash';
import moment from 'moment';

import EventsWidget from '../EventsWidget'
import eventImg1 from '../../static/imgs/stock-event-1.jpg';

import Card from '../Card';
import Calendar from 'react-calendar';

import { addEventToProject } from '../../state/actions/index.js'

const mapStateToProps = (state) => ({
  events: get(state, 'events', {}),
  posts: get(state, 'posts', {})
  // animationVal: _.get(state, 'events.animationVal', null),
  // numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
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
              project: '',
              tags: [],
              owner: 'Test User',
              private: false
            }
        }
    }

    componentWillMount() {
      // this.props.addEventToProject()
    }

    submitEvent() {
      console.log('click')
      const event = {
        'name': 'event name',
        'eventDate': '2017-08-12T09:30:00',
        'description': 'event description',
        'location': 'University of Oregon',
        'projectID': '1234',
        'tags': ['food', 'winter'],
        'private': false,
        'organization': {
          'id': '5ac9877976448030b88ac636',
          'name': 'FOOD for Lane County'
        }
      }
      // console.log('this.props', this.props)
      this.props.addEventToProject(JSON.stringify(event))
    }

    renderForm() {
      return (
        <Card>
          {/* <div className="card-header">{date}</div> */}
          {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
          <div className="card-body">
            {/* <form> */}
              <div className="form-group">
                <label for="eventName">Title</label>
                <input type="text" className="form-control" id="eventName"/>
              </div>
              <div className="form-group">
                <label for="eventDate">Date</label>
                <input type="datetime-local" className="form-control" id="eventDate"/>
              </div>
              <div className="form-group">
                <label for="eventDescription">Description</label>
                <textarea type="text" className="form-control" id="eventDescription"/>
              </div>
              <div className="form-group">
                <label for="eventLocation">Location</label>
                <input type="text" className="form-control" id="eventLocation"/>
              </div>
              <div className="form-group">
                <label for="eventProject">Project</label>
                <select className="form-control">
                  <option>Select Project</option>
                  <option>Fall Food Initiative</option>
                  <option>Winter Warmth Project</option>
                </select>
              </div>
              <div className="form-group">
                <label for="eventTags">Tags</label>
                <input type="text" className="form-control" id="eventTags" placeholder="Enter a comma separated list..."/>
              </div>
              <div className="form-check form-group">
                <input className="form-check-input" type="checkbox" id="eventViewability" />
                <label className="form-check-label" for="eventViewability">
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
      // console.log(this.props)
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
