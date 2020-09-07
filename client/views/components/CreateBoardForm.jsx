import React, { Component } from "react";
import { createBoard } from "../../store/action";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import Loader from "./Loader";

class CreateBoardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      teamId: null,
      isPublic: false,
    };
  }

  handleInput = ({ target: { name, value } }) => {
    if(name == "teamId" &&  !value) {
      return this.setState({[name]: null})
    }
    return this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    return this.props.dispatch(createBoard(this.state, this.props.history));
  };

  render() {
    let { teams,userInfo } = this.props;
    if (userInfo.teamId.length && !teams.length) {
      return <Loader />;
    }
    return (
      <>
        <div className="board_create_form_wrapper">
          <div className="board_create_form">
            <label htmlFor="closeCreateBoardModal">
              <i className="fas fa-times"></i>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Add board title"
              onChange={this.handleInput}
            />

            <select name="teamId" onChange={this.handleInput}>
              <option value="">No team</option>
              {teams.map((team) => {
                return <option value={`${team._id}`}>{team.name}</option>;
              })}
            </select>

            <select name="isPublic" onChange={this.handleInput}>
              <option value="1">Public</option>
              <option value="0">Private</option>
            </select>
          </div>
        </div>
        <div className="button_wrapper">
          {!this.state.name ? (
            <button type="submit">Create Board</button>
          ) : (
            <button
              type="submit"
              className="active"
              onClick={this.handleSubmit}
            >
              Create Board
            </button>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps({ teams,userInfo }) {
  return { teams, userInfo };
}

export default connect(mapStateToProps)(withRouter(CreateBoardForm));
