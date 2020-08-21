import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateBoardModal from "./CreateBoardModal";
import { connect } from "react-redux";
import { getBoardList } from "../../store/action";
import uuid from "react-uuid";
import Loader from "./Loader";

class BoardHome extends Component {
  componentDidMount() {
    return this.props.dispatch(getBoardList());
  }
  render() {
    let { boards, teams } = this.props;
    let teamWithBoard = teams.filter((team) => team.boardId);

    return (
      <>
        <p className="board_category">
          <i className="far fa-user"></i> Personal Boards
        </p>
        <ul className="board_list">
          {boards.length ? (
            boards
              .filter((board) => !board.teamId)
              .map((board) => {
                return (
                  <li key={uuid()} className="home_card">
                    {board.name}
                  </li>
                );
              })
          ) : (
            <></>
          )}
          <li>
            <label htmlFor="toggleCreateBoardModal" className="home_card">
              Create new board
            </label>
          </li>
        </ul>{" "}
        {boards.length > 0 &&
          teamWithBoard.length > 0 &&
          teamWithBoard.map((team) => {
            return (
              <>
                <p className="board_category">
                  <i className="far fa-user"></i> {team.name}
                </p>

                <ul className="board_list">
                  {team.boardId.map((boardId) => {
                    let teamBoard = boards.find(
                      (board) => board._id == boardId
                    );
                    return (
                      <>
                        <li className="home_card" key={uuid()}>
                          {teamBoard.name}
                        </li>
                      </>
                    );
                  })}
                  <li>
                    <label
                      htmlFor="toggleCreateBoardModal"
                      className="home_card"
                    >
                      Create new board
                    </label>
                  </li>
                </ul>
              </>
            );
          })}
        <CreateBoardModal />
      </>
    );
  }
}

function mapStateToProps({ boards, teams }) {
  return { boards, teams };
}

export default connect(mapStateToProps)(BoardHome);
