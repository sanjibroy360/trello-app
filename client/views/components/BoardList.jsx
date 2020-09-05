import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateBoardModal from "./CreateBoardModal";
import { connect } from "react-redux";
import { getPersonalBoards, getTeamBoards } from "../../store/action";
import uuid from "react-uuid";
import Loader from "./Loader";

class BoardList extends Component {
  // componentDidMount() {
  //   this.props.dispatch(getPersonalBoards());
  //   return this.props.dispatch(getTeamBoards());
  // }
  render() {
    let { personalBoards, teamBoards, teams } = this.props;

    return (
      <>
        <p className="board_category" key={uuid()}>
          <i className="far fa-user" key={uuid()}></i> Personal Boards
        </p>
        <ul className="board_list">
          {personalBoards.length ? (
            personalBoards
              .filter((board) => !board.teamId)
              .map((board) => {
                return (
                  <Link to={`/board/${board.slug}`} key={uuid()}>
                    <li key={uuid()} className="home_card board_card">
                      <span className="board-tile-fade" key={uuid()}></span>
                      <span className="board_name" key={uuid()}>
                        {board.name}
                      </span>
                    </li>
                  </Link>
                );
              })
          ) : (
            <></>
          )}
          <li key={uuid()}>
            <label
              htmlFor="toggleCreateBoardModal"
              className="home_card"
              key={uuid()}
            >
              Create new board
            </label>
          </li>
        </ul>{" "}
        {teamBoards.length && teams.length ? (
          teams.map((team) => {
            return (
              <>
                <p className="board_category" key={uuid()}>
                  <i class="fas fa-users"></i>&nbsp;{team.name}
                </p>

                <ul className="board_list">
                  {teamBoards.map((board) => {
                    if (board.teamId.name == team.name) {
                      return (
                        <>
                          <Link to={`/board/${board.slug}`} key={uuid()}>
                            <li className="home_card board_card" key={uuid()}>
                              <span
                                className="board-tile-fade"
                                key={uuid()}
                              ></span>
                              <p className="board_name" key={uuid()}>
                                {board.name}
                              </p>
                            </li>
                          </Link>
                        </>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                  <li key={uuid()}>
                    <label
                      htmlFor="toggleCreateBoardModal"
                      className="home_card"
                      key={uuid()}
                    >
                      Create new board
                    </label>
                  </li>
                </ul>
              </>
            );
          })
        ) : (
          <></>
        )}
        <CreateBoardModal />
      </>
    );
  }
}

function mapStateToProps({ personalBoards, teamBoards, teams, singleBoard }) {
  return { personalBoards, teamBoards, teams, singleBoard };
}

export default connect(mapStateToProps)(BoardList);
