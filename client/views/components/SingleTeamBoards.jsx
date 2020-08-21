import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { withRouter } from "react-router-dom";

import { getSingleTeamInfo, getBoardList } from "../../store/action";
import TeamPageTabs from "./TeamPageTabs";
import TeamInfo from "./TeamInfo";

class SingleTeamBoards extends Component {
  componentDidMount() {
    let { teamSlug } = this.props.match.params;
    this.props.dispatch(getSingleTeamInfo(teamSlug))
    return this.props.dispatch(getBoardList());
  }
  // componentDidUpdate() {
    // let { teamSlug } = this.props.match.params;
  //   if (this.props.singleTeam.slug != teamSlug) {
  //     let { teamSlug } = this.props.match.params;
  //     return this.props.dispatch(getSingleTeamInfo(teamSlug));
  //   }
  // }

  render() {
    let { boards, singleTeam } = this.props;
    console.log(boards, singleTeam);
    return (
      <>
        <TeamInfo />
        <TeamPageTabs activeTab="0" />
        {boards.length && singleTeam.slug ? (
          <div className="team_page_container">
            <ul className="board_list">
              {singleTeam.boardId.map((boardId) => {
                let teamBoard = boards.find((board) => board._id == boardId);
                return (
                  <>
                    {teamBoard.name ? (
                      <li className="home_card" key={uuid()}>
                        {teamBoard.name}
                      </li>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
        ) : (
          <> </>
        )}
      </>
    );
  }
}

function mapStateToProps({ singleTeam, boards }) {
  return { singleTeam, boards };
}

export default connect(mapStateToProps)(withRouter(SingleTeamBoards));
