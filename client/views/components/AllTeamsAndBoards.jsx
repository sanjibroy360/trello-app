import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import BoardList from "./BoardList";
import { connect } from "react-redux";
import { getPersonalBoards, getTeamBoards } from "../../store/action";

class AllTeamsAndBoards extends Component {
  componentDidMount() {
    this.props.dispatch(getPersonalBoards());
    return this.props.dispatch(getTeamBoards());
  }

  render() {
    return (
      <div className="container auth_home ">
        <Sidebar />
        <div className="leftside_component">
          <BoardList />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ personalBoards, teamBoards, teams, singleBoard }) {
  return { personalBoards, teamBoards, teams, singleBoard };
}

export default connect(mapStateToProps)(AllTeamsAndBoards);
