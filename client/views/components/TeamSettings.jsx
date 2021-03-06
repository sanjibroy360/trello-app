import React, { Component } from "react";
import TeamPageTabs from "./TeamPageTabs";
import TeamInfo from "./TeamInfo";
import CardPopup from "./CardPopup";
import { connect } from "react-redux";
import { editTeam, getSingleTeamInfo, deleteTeam } from "../../store/action";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";

class TeamSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenVisibilityPopup: false,
      isOpenDeletePopup: false,
    };
  }
  componentDidMount() {
    let slug = this.props.match.params.teamSlug;
    return this.props.dispatch(getSingleTeamInfo(slug, this.props.history));
  }

  handleVisibilityChange = (isPublic) => {
    let payload = { isPublic };
    let slug = this.props.match.params.teamSlug;
    let dest = `account`;
    this.handleVisibilityPopup();
    return this.props.dispatch(
      editTeam(slug, payload, this.props.history, dest)
    );
  };

  handleVisibilityPopup = () => {
    return this.setState({
      isOpenVisibilityPopup: !this.state.isOpenVisibilityPopup,
    });
  };

  handleDeletePopup = () => {
    return this.setState({
      isOpenDeletePopup: !this.state.isOpenDeletePopup,
    });
  };

  handleTeamDelete = () => {
    let slug = this.props.match.params.teamSlug;
    this.handleVisibilityPopup();
    return this.props.dispatch(deleteTeam(slug, this.props.history));
  };
  render() {
    let { singleTeam, userInfo } = this.props;
    if (!singleTeam.owner) {
      return <Loader />;
    }
    return (
      <>
        <TeamInfo />
        <TeamPageTabs activeTab="2" />
        <div className="team_page_container team_settings">
          <h3>Team Visibility</h3>
          <hr />
          <div className="row">
            {singleTeam.isPublic ? (
              <>
                <p>
                  <b>Public -</b> This team is public. It's visible to anyone
                  with the link and will show up in search engines like Google.
                  Only those invited to the team can add and edit team boards.
                </p>
                <div>
                  {singleTeam.owner._id == userInfo.id ? (
                    <CardPopup
                      content={visibilityOptions(this.handleVisibilityChange)}
                      open={this.state.isOpenVisibilityPopup}
                      trigger={
                        <button onClick={this.handleVisibilityPopup}>
                          Change
                        </button>
                      }
                    />
                  ) : (
                    <button className="disable">Change</button>
                  )}
                </div>
              </>
            ) : (
              <>
                <p>
                  <b>Private -</b> This team is private. It's not indexed or
                  visible to those outside the team.
                </p>
                <div>
                  {singleTeam.owner._id == userInfo.id ? (
                    <CardPopup
                      content={visibilityOptions(this.handleVisibilityChange)}
                      open={this.state.isOpenVisibilityPopup}
                      trigger={
                        <button onClick={this.handleVisibilityPopup}>
                          Change
                        </button>
                      }
                    />
                  ) : (
                    <button className="disable">Change</button>
                  )}
                </div>
              </>
            )}
          </div>
          {singleTeam.owner._id == userInfo.id ? (
            <>
              <div className="row">
                <p>
                  <h3>Delete this team</h3>
                  Once you delete a team, there is no going back. Please be
                  certain.
                </p>
                <div>
                  <CardPopup
                    content={handleTeamDeleteWarnig(this.handleTeamDelete)}
                    trigger={
                      <button onClick={this.handleDeletePopup}>Delete</button>
                    }
                    open={this.state.isOpenDeletePopup}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

function handleTeamDeleteWarnig(handleTeamDelete) {
  return (
    <>
      <div className="card_content_wrapper">
        <p className="card_heading">Delete Team?</p>
        <hr />
        <div>
          <p className="card_text">
            Deleting a team is permanent. Are you sure you want to delete this
            team? There is no undo. Boards with this team won't be deleted. Your
            boards in this team will appear in your personal boards list.
          </p>
          <button className="link delbtn" onClick={() => handleTeamDelete()}>
            Delete Forever
          </button>
        </div>
      </div>
    </>
  );
}

function visibilityOptions(handleVisibilityChange) {
  return (
    <>
      <div className="card_content_wrapper">
        <p className="card_heading">Select Team Visibility</p>
        <hr />
        <ul>
          <li className="link" onClick={() => handleVisibilityChange(false)}>
            <b className="card_list_heading">Private</b>
            <p className="card_text">
              This team is private. It's not indexed or visible to those outside
              the team.
            </p>
          </li>

          <li className="link" onClick={() => handleVisibilityChange(true)}>
            <b className="card_list_heading">Public</b>
            <p className="card_text">
              This team is public. It's visible to anyone with the link and will
              show up in search engines like Google. Only those invited to the
              team can add and edit team boards.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

function mapStateToProps({ singleTeam, userInfo }) {
  return { singleTeam, userInfo };
}

export default connect(mapStateToProps)(withRouter(TeamSettings));
