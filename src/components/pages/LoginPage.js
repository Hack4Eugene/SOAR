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

const login = () => {

}

class LoginPage extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillMount() {

    }

    login() {
      console.log('Loggin in!')
      this.props.loginUser(this.state.username, this.state.password)
    }

    handleUsernameChange(e) {
       this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

    renderForm() {
      return (
        <Card>
          {/* <div className="card-header">{date}</div> */}
          {/* <img className="card-img-top" src={eventImg1} alt="Card image cap" /> */}
          <div className="card-body">
            {/* <form> */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={(e) => this.handleUsernameChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => this.handlePasswordChange(e)}/>
              </div>
              <button className="btn btn-primary" onClick={this.login.bind(this)}>Submit</button>
            {/* </form> */}
          </div>
      </Card>
      )
    }

    render() {
      console.log(this.props)
      return(
          <div className="container">                    
              <div className="row justify-content-center">
                  <div className="col-5">
                    <h2 className="ml-3">Login</h2>
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

export default connect(mapStateToProps, { loginUser })(LoginPage);
