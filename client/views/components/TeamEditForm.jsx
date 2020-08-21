import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, Form, Segment, Message } from "semantic-ui-react";

import { editTeam } from "../../store/action";

class TeamEditForm extends Component {
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
    let dest = `/team/${this.props.match.params.teamSlug}`;
    return this.props.dispatch(
      editTeam(
        this.props.match.params.teamSlug,
        this.state,
        this.props.history,
        dest
      )
    );
  };

  render() {
    let { name, type, description } = this.state;
    return (
      <div className="team_page_container">
        <Form>
          <Form.Field>
            <label>Team</label>
            <input
              type="text"
              value={name}
              placeholder="Taco's Co."
              name="name"
              onChange={this.handleInput}
            />
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
            <textarea
              name="description"
              rows="10"
              value={description}
              placeholder="Description"
              onChange={this.handleInput}
            ></textarea>
          </Form.Field>
          <nobr>
            <button onClick={this.handleSubmit} className="btn save">
              Save
            </button>
          </nobr>
          <nobr>
            <button onClick={this.props.closeForm} className="btn cancel">
              Cancel
            </button>
          </nobr>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ singleTeam }) {
  return { singleTeam };
}

export default connect(mapStateToProps)(withRouter(TeamEditForm));
