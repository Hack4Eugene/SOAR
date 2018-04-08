import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter, cloneDeep } from 'lodash';
import moment from 'moment';

import EventsWidget from '../EventsWidget'
import eventImg1 from '../../static/imgs/stock-event-1.jpg';

import Card from '../Card';
import Calendar from 'react-calendar';

import { addUser } from '../../state/actions/index.js'

const mapStateToProps = (state) => ({
  events: get(state, 'events', {}),
  posts: get(state, 'posts', {})
});

class AddUser extends Component {
    constructor (props) {
        super(props)
        this.state = {
            newUser: {
              name: '',
              address: {
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: ''
              },
              contactInformation: {
                phoneNumber: '',
                email: ''
              },
              website: '',
              description: ''
            }
        }
    }

    submitOrg() {
      this.props.addOrganization(JSON.stringify(this.state.newUser))
    }

    handleFormInput(e) {
      const tempUser = cloneDeep(this.state.newUser);
      switch(e.target.id) {
        case 'fullName':
          tempUser.fullName = e.target.value
          this.setState({newUser: tempUser})
          break
        case 'userName':
          tempUser.userName = e.target.value
          this.setState({newUser: tempUser})
          break
        case 'password':
          tempUser.password = e.target.value
          this.setState({newUser: tempUser})
          break
      }
    }

    renderForm() {
      return (
        <Card>
          {/* <div className="card-header">{date}</div> */}
          {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
          <div className="card-body">
            {/* <form> */}
              <div className="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" className="form-control" id="fullName" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="userName">Username</label>
                <input type="text" className="form-control" id="userName" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="text" className="form-control" id="password" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              
              <button className="btn btn-primary" onClick={this.submitOrg.bind(this)}>Submit</button>
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
                    <h2 className="ml-3">New User Registration</h2>
                  </div>
                  <div className="col-3">
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

export default connect(mapStateToProps, { addUser })(AddUser);
