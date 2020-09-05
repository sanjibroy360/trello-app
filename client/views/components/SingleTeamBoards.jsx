import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { withRouter, Link } from "react-router-dom";

import { getSingleTeamInfo } from "../../store/action";
import TeamPageTabs from "./TeamPageTabs";
import TeamInfo from "./TeamInfo";

class SingleTeamBoards extends Component {
  componentDidMount() {
    let { teamSlug } = this.props.match.params;
    return this.props.dispatch(getSingleTeamInfo(teamSlug, this.props.history));
  }

  render() {
    let { singleTeam } = this.props;
    let teamBoards = singleTeam.boardId;
    return (
      <>
        <TeamInfo />
        <TeamPageTabs activeTab="0" />
        <div className="team_page_container">
          {teamBoards && teamBoards.length > 0 ? (
            <>
              <ul className="board_list">
                {teamBoards.map((board) => {
                  return (
                    <Link to={`/board/${board.slug}`}>
                      <li className="home_card board_card" key={uuid()}>
                        <span className="board-tile-fade"></span>
                        <span className="board_name">{board.name}</span>
                      </li>
                    </Link>
                  );
                })}
                <li key={uuid}>
                  <label htmlFor="toggleCreateBoardModal" className="home_card">
                    Create new board
                  </label>
                </li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps({ singleTeam }) {
  return { singleTeam };
}

export default connect(mapStateToProps)(withRouter(SingleTeamBoards));
