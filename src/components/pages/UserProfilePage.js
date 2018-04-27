import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom'
import { get, filter, isEqual, isArray } from 'lodash';

import { SUCCESS } from '../../state/statusTypes';

import Card from '../Card';

import { loginUser } from '../../state/actions/index.js';
import EventsWidget from '../EventsWidget';

import { getEvents } from '../../state/actions/index.js';

import parkImg from '../../static/imgs/food.jpg';
import foodLaneImg from '../../static/imgs/food-lane-county.jpg';
import peaceImg from '../../static/imgs/peace-corps.jpg';
import habitatImg from '../../static/imgs/habitat-humanity.png';
import userImg from '../../static/imgs/user-image.png';

const mapStateToProps = (state) => ({
    events: get(state, 'events', {}),
});

class UserProfilePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        filteredEvents: props.events
    }
  }

  componentWillMount() {
    this.props.getEvents()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-1">
            <img src={userImg} className="user-image" />
          </div>
          <div className="col">
            <h1>EasyKesey75</h1>
            <i>Member since 2015</i>
          </div>
          
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-3">
          <div class="card">
            <div class="card-header">
              Menu
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Photos</li>
              <li class="list-group-item">Messages<span class="badge badge-pill badge-primary float-right">4</span></li>
              <li class="list-group-item">Settings</li>
            </ul>
          </div>
          <hr className="my-4" />
          <div class="card">
            <div class="card-header">
              Interests
            </div>
            <div class="card-body">
            <span class="badge badge-pill badge-success mr-2">Cooks</span>
              <span class="badge badge-pill badge-success mr-2">Drivers</span>
              <span class="badge badge-pill badge-warning mr-2">Shift Managers</span>
              <span class="badge badge-pill badge-primary mr-2">Night Owls</span>
              <span class="badge badge-pill badge-success mr-2">Elder Caregivers</span>
              <span class="badge badge-pill badge-danger mr-2">Artists</span>
              <span class="badge badge-pill badge-primary mr-2">STEM Advocates</span>
            </div>
          </div>
          </div>
          <div className="col-9">
            <div className="card">
              <div class="card-header">
                Member of 3 Organizations
              </div>
              <div class="card-body">
              <div className="row">
                  <div class="card col p-0 ml-3 mb-3" style={{width: '10rem'}}>    
                               
                                      
                    <img className="card-image card-org-image" src={foodLaneImg} />  
                    <div class="card-body org-card-body">
                    <Link className="btn btn-outline-success org-card-button" to="/profile">Go to organization</Link>          
                  </div>
                </div>
                <div class="card col p-0 ml-3 mb-3" style={{width: '10rem'}}>    
                               
                                      
                    <img className="card-image card-org-image" src={habitatImg} />  
                    <div class="card-body org-card-body">
                    <Link className="btn btn-outline-success org-card-button" to="/profile">Go to organization</Link>          
                  </div>
                </div>
                <div class="card col p-0 ml-3 mb-3" style={{width: '10rem'}}>    
                               
                                      
                    <img className="card-image card-org-image" src={peaceImg} />  
                    <div class="card-body org-card-body">
                    <Link className="btn btn-outline-success org-card-button" to="/profile">Go to organization</Link>          
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, { getEvents })(UserProfilePage);