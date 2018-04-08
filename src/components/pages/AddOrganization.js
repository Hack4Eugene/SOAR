import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, filter, cloneDeep } from 'lodash';
import moment from 'moment';

import EventsWidget from '../EventsWidget'
import eventImg1 from '../../static/imgs/stock-event-1.jpg';

import Card from '../Card';
import Calendar from 'react-calendar';

import { addOrganization } from '../../state/actions/index.js'

const mapStateToProps = (state) => ({
  events: get(state, 'events', {}),
  posts: get(state, 'posts', {})
});

class AddOrganization extends Component {
    constructor (props) {
        super(props)
        this.state = {
            newOrg: {
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
      this.props.addOrganization(JSON.stringify(this.state.newOrg))
    }

    handleFormInput(e) {
      const newState = cloneDeep(this.state.newOrg);
      switch(e.target.id) {
        case 'orgName':
          newState.name = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgStreet':
          newState.address.street = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgCity':
          newState.address.city = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgState':
          newState.address.state = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgZipcode':
          newState.address.zipcode = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgCountry':
          newState.address.country = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgPhone':
          newState.contactInformation.phoneNumber = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgEmail':
          newState.contactInformation.email = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgWebsite':
          newState.website = e.target.value
          this.setState({newOrg: newState})
          break
        case 'orgDescription':
          newState.description = e.target.value
          this.setState({newEvent: newState})
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
                <label for="OrgName">Title</label>
                <input type="text" className="form-control" id="orgName" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgStreet">Street</label>
                <input type="text" className="form-control" id="orgStreet" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgCity">City</label>
                <input type="text" className="form-control" id="orgCity" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgState">State</label>
                <input type="text" className="form-control" id="orgState" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgZipcode">Zip Code</label>
                <input type="text" className="form-control" id="orgZipcode" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgCountry">Country</label>
                <input type="text" className="form-control" id="orgCountry" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgPhone">Phone Number</label>
                <input type="text" className="form-control" id="orgPhone" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgEmail">Email Address</label>
                <input type="text" className="form-control" id="orgEmail" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgWebsite">Website</label>
                <input type="text" className="form-control" id="orgWebsite" onChange={(e) => this.handleFormInput(e)}/>
              </div>
              <div className="form-group">
                <label for="orgDescription">Description</label>
                <textarea type="text" className="form-control" id="orgDescription" onChange={(e) => this.handleFormInput(e)}/>
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
                    <h2 className="ml-3">Add Organization</h2>
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

export default connect(mapStateToProps, { addOrganization })(AddOrganization);
