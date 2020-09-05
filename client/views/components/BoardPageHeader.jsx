import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTeamList, updateBoardInfo, deleteBoard } from "../../store/action";
import uuid from "react-uuid";

class BoardPageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      teamId: null,
      isPublic: "",
      enableEditMode: false,
    };
  }

  componentDidMount() {
    let { name, isPublic } = this.props.singleBoard;
    let { teamId } = this.props.singleBoard;

    if (teamId) {
      teamId = this.props.singleBoard.teamId._id;
    } else {
      teamId = null;
    }
    return this.setState({ name, teamId, isPublic });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.singleBoard !== this.props.singleBoard) {
      let { teamId } = this.props.singleBoard;
      if (teamId) {
        teamId = this.props.singleBoard.teamId._id;
      } else {
        teamId = null;
      }
      let { name, isPublic } = this.props.singleBoard;
      return this.setState({ name, teamId, isPublic });
    }
  }

  replaceElm = () => {
    return this.setState({ enableEditMode: true });
  };

  handleOption = ({ target: { value, name } }) => {
    let { teamId, isPublic, enableEditMode } = this.state;
    if (name == "teamId") {
      teamId = value || null;
    } else if (name == "isPublic") {
      isPublic = value;
    }
    name = this.state.name;
    let payload = { name, teamId, isPublic };
    let slug = this.props.match.params.boardSlug;
    return this.props.dispatch(
      updateBoardInfo(payload, slug, this.props.history)
    );
  };

  handleInput = ({ target: { value, name } }) => {
    if (name == "teamId" && !value) {
      return this.setState({ [name]: null });
    }

    if (name == "teamId" || name == "isPublic") {
      return this.handleEditBoard();
    }
    return this.setState({ [name]: value });
  };

  handleEditBoard = () => {
    let { name, teamId, isPublic, enableEditMode } = this.state;
    let payload = { name: name, teamId: teamId, isPublic: isPublic };

    let slug = this.props.match.params.boardSlug;
    if (enableEditMode) {
      this.setState({ enableEditMode: false });
    }
    return this.props.dispatch(
      updateBoardInfo(payload, slug, this.props.history)
    );
  };

  handleDeleteBoard = () => {
    let slug = this.props.match.params.boardSlug;
    return this.props.dispatch(deleteBoard(slug, this.props.history));
  };

  render() {
    let board = this.props.singleBoard;
    let { teams, userInfo, singleBoard } = this.props;

    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;

    let { teamId, name, isPublic, enableEditMode } = this.state;
    let teamName = (board.teamId && board.teamId.name) || "";
    if (!board.name && !name && !userInfo.username) {
      return <Loader />;
    }
    return (
      <div className="board_header">
        <div className="container">
          <ul className="menu">
            <li key={board._id + 1}>
              {board.owner._id != userInfo.id || !enableEditMode ? (
                <nobr>
                  <p onClick={this.replaceElm} className="board_name">
                    {name}
                  </p>
                </nobr>
              ) : (
                <input
                  id={board._id}
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.handleInput}
                  onBlur={this.handleEditBoard}
                  className="board_name_input"
                />
              )}
            </li>
            <li key={uuid()}>
              {board.owner._id == userInfo.id ? (
                <>
                  <div className="select_wrapper">
                    <select
                      name="teamId"
                      value={teamId || ""}
                      onChange={this.handleOption}
                    >
                      <option value="">Personal Boards (no team)</option>
                      {teams.map((team) => {
                        return <option value={team._id}>{team.name}</option>;
                      })}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <span>{teamName || "Personal Boards (no team)"}</span>
                </>
              )}
            </li>
            <li key={uuid()}>
              {board.owner._id == userInfo.id ? (
                <>
                  <div className="select_wrapper">
                    <select
                      name="isPublic"
                      value={Number(isPublic) + ""}
                      onChange={this.handleOption}
                    >
                      <option value="0">Private</option>
                      <option value="1">Public</option>
                    </select>
                  </div>
                </>
              ) : (
                <span>{board.isPublic ? "Public" : "Private"}</span>
              )}
            </li>
          </ul>
          {isMember && board.owner._id == userInfo.id ? (
            <div className="del_btn">
              <nobr>
                <button onClick={this.handleDeleteBoard}>
                  <i class="far fa-trash-alt"></i>&nbsp;Delete Board
                </button>
              </nobr>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ singleBoard, teams, userInfo }) {
  return { singleBoard, teams, userInfo };
}
export default connect(mapStateToProps)(withRouter(BoardPageHeader));
