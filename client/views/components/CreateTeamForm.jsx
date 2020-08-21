import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import { Button, Checkbox, Form, Segment, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { userSignup } from "../../store/action";
import {createTeam} from "../../store/action";

import axios from "axios";

class CreateTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      description: "",
    };
  }

  handleInput = ({ target: { value, name } }) => {
    return this.setState({ [name]: value.trim() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    return this.props.dispatch(createTeam(this.state, this.props.history));
  }

  render() {
    let { name, type, description } = this.state;
    return (
      <>
        <div className="create_team_form">
          <h2>Let's Build a Team</h2>
          <p className="form_head_para">
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Team</label>
              <input
                type="text"
                value={name}
                placeholder="Taco's Co."
                name="name"
                onChange={this.handleInput}
                onBlur={this.isUsernameAvailable}
              />
              <p className="small_text">
                This is the name of your company, team or organization.
              </p>
            </Form.Field>

            <Form.Field>
              <label>Team Type</label>
              <select name="type" onChange={this.handleInput}>
                <option value="">Select</option>
                <option value="education">Education</option>
                <option value="marketing">Marketing</option>
                <option value="engineering-it">Engineering-IT</option>
                <option value="small business">Small Business</option>
                <option value="human resources">Human Resources</option>
                <option value="operations">Operations</option>
                <option value="sales crm">Sales CRM</option>
                <option value="other">Other</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>
                Team Description <span className="small_text">Optional</span>
              </label>
              <textarea
                name="description"
                rows="10"
                onChange={this.handleInput}
              ></textarea>
              <p className="small_text">
                Get your members on board with a few words about your team.
              </p>
            </Form.Field>

            {name && type ? (
              <Button type="submit" className="submit_btn">
                Continue
              </Button>
            ) : (
              <button className="submit_btn disable_btn" disabled>
                Continue
              </button>
            )}
          </Form>
        </div>
      </>
    );
  }
}

export default connect()(withRouter(CreateTeamForm));
