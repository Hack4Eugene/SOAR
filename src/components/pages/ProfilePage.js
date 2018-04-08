import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter } from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom'

import Card from '../Card';
import Calendar from 'react-calendar';

import { loginUser } from '../../state/actions/index.js'

const mapStateToProps = (state) => ({
  events: get(state, 'events', {}),
  posts: get(state, 'posts', {}),
  user: get(state, 'user', {})
  // animationVal: _.get(state, 'events.animationVal', null),
  // numFinishedEvents: _.get(state, 'events.numFinishedEvents', null)
});

class ProfilePage extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillMount() {

    }

    render() {
      console.log(this.props)
      return(
          <div className="container">                    
              <div class="jumbotron p-4">
                <h1 class="display-4">FOOD for Lane County</h1>                
                <p class="lead">We are a private, 501(c)(3) nonprofit food bank dedicated to alleviating hunger by creating access to food.</p>
                <hr class="my-4" />
                <p>We accomplish this by soliciting, collecting, rescuing, growing, preparing and packaging food for distribution through a network of more than 150 partner agencies and distribution sites; through public awareness, education and community advocacy; and through programs designed to improve the ability of low-income individuals to maintain an adequate supply of wholesome, nutritious food.</p>
                {/* <p class="lead"> */}
                <hr class="my-4" />
                <input class="form-control form-control-lg" type="text" placeholder="Filter projects by tag..." />
                {/* </p> */}
              </div>
            <div className="row">
              <div class="card col p-0 ml-3 mb-3" style={{width: '10rem'}}>
              <div class="card-header">
              <h5 class="card-title mb-0">Winter Food Drive</h5>
              </div>
              <div class="card-body">
                
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-outline-success float-right">More Info</a>
              </div>
            </div>

            <div class="card col ml-3 mr-3 p-0 mb-3" style={{width: '10rem'}}>
            <div class="card-header">
              <h5 class="card-title mb-0">Meal Prep Initiative</h5>
              </div>
              <div class="card-body">
      
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-outline-success float-right">More Info</a>
              </div>
            </div>

            <div class="card col p-0 mr-3 mb-3" style={{width: '10rem'}}>
            <div class="card-header">
              <h5 class="card-title mb-0">Gluten Free Gardener</h5>
              </div>
              <div class="card-body">
                
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-outline-success float-right">More Info</a>
              </div>
            </div>
          </div>
          <div className="row">
              <div class="card col p-0 ml-3 mb-3" style={{width: '10rem'}}>
              <div class="card-header">
              <h5 class="card-title mb-0">Frozen Food Storage</h5>
              </div>
              <div class="card-body">
                
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-outline-success float-right">More Info</a>
              </div>
            </div>

            <div class="card col ml-3 mr-3 p-0 mb-3" style={{width: '10rem'}}>
            <div class="card-header">
              <h5 class="card-title mb-0">Personal Hygiene Classes</h5>
              </div>
              <div class="card-body">
                
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-outline-success float-right">More Info</a>
              </div>
            </div>

            <div class="card col p-0 mr-3 mb-3" style={{width: '10rem'}}>
            <div class="card-header">
              <h5 class="card-title mb-0">Summer Hunger Fighters</h5>
              </div>
              <div class="card-body">
                
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-outline-success float-right">More Info</a>
              </div>
            </div>
          </div>

          <div class="jumbotron jumbotron-fluid p-4">
            <div class="container">
              <h1 class="display-4">Lend a hand! ✋</h1>
              <p class="lead">Are you interested in joining our organization? We're looking for individuals with the following skills and interests:</p>
              <span class="badge badge-pill badge-success mr-2">Cooks</span>
              <span class="badge badge-pill badge-success mr-2">Drivers</span>
              <span class="badge badge-pill badge-warning mr-2">Shift Managers</span>
              <span class="badge badge-pill badge-primary mr-2">Night Owls</span>
              <span class="badge badge-pill badge-success mr-2">Elder Caregivers</span>
              <span class="badge badge-pill badge-danger mr-2">Artists</span>
              <span class="badge badge-pill badge-primary mr-2">STEM Advocates</span>

              <button type="button" class="btn btn-outline-success float-right">Join Now</button>
            </div>
          </div>
          </div>
        )
    }
}

export default connect(mapStateToProps)(ProfilePage);
