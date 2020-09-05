import React, { Component } from "react";
import TeamPageTabs from "./TeamPageTabs";
import TeamInfo from "./TeamInfo";
import CardPopup from "./CardPopup";
import {
  addTeamMember,
  getSingleTeamInfo,
  removeTeamMember,
} from "../../store/action";
import { connect } from "react-redux";
import { Button, Checkbox, Form, Segment, Message } from "semantic-ui-react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.headers.post["Content-Type"] = `application/json`;

class TeamMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      error: "",
    };
  }

  componentDidMount() {
    let slug = this.props.match.params.teamSlug;
    return this.props.dispatch(getSingleTeamInfo(slug, this.props.history));
  }

  handleInput = ({ target: { name, value } }) => {
    return this.setState({ [name]: value });
  };

  handleSubmit = ({ target: { name, value } }) => {
    let { teamSlug } = this.props.match.params;
    let { username, error } = this.state;
    let { singleTeam, userInfo } = this.props;

    let isAlreadyAdded = singleTeam.members.some(
      (member) => member.username == username
    );

    if (isAlreadyAdded) {
      return this.setState({
        error: `"@${username}" is already added to the team.`,
        username: "",
      });
    }

    axios
      .get(`/user/${username}`)
      .then(({ user }) => {
        if (error) {
          return this.setState({ error: null });
        }
      })
      .catch((error) =>
        this.setState({ error: "User not found!", username: "" })
      );
    if (!error) {
      this.setState({ username: "" });
      return this.props.dispatch(
        addTeamMember(teamSlug, username, this.props.history)
      );
    }
  };

  handleRemoveMember = (username) => {
    let { teamSlug } = this.props.match.params;
    let { error } = this.state;
    let { singleTeam, userInfo } = this.props;
    let dest =
      singleTeam.owner && singleTeam.owner.username !== userInfo.username
        ? `/boards`
        : `/team/${teamSlug}/members`;
    return this.props.dispatch(
      removeTeamMember(teamSlug, username, this.props.history, dest)
    );
  };

  render() {
    let { singleTeam, userInfo } = this.props;
    let { username, error } = this.state;
    return (
      <>
        <TeamInfo />
        <TeamPageTabs activeTab="1" />
        <div className="team_page_container">
          {singleTeam.owner &&
          singleTeam.owner.username !== userInfo.username ? (
            <></>
          ) : (
            <>
              <div className="add_team_member_form">
                <div>
                  <h2>Invite Your Team</h2>
                  <p className="form_head_para">
                    Trello makes teamwork your best work. Invite your new team
                    members to get going!
                  </p>
                  <Form>
                    <Form.Field>
                      <label>Team Member</label>
                      <input
                        type="text"
                        value={username}
                        placeholder="Taco's Co."
                        name="username"
                        onChange={this.handleInput}
                      />
                      {error ? (
                        <p className="small_error_msg">{error}</p>
                      ) : (
                        <p className="small_error_msg"></p>
                      )}
                    </Form.Field>
                    {!username ? (
                      <button>Invite</button>
                    ) : (
                      <button onClick={this.handleSubmit} className="active">
                        Invite
                      </button>
                    )}
                  </Form>
                </div>
                <div>
                  <img
                    src="https://a.trellocdn.com/prgb/dist/images/organization/empty-board.286f8fc83e01c93ed27e.svg"
                    alt="Presentation"
                  />
                </div>
              </div>
            </>
          )}

          <div className="member_list_wrapper">
            <ul className="member_list">
              {(singleTeam.members && singleTeam.members.length > 1) ||
              singleTeam.owner._id != userInfo.id ? (
                <>
                  <h3>Team Members ({`${singleTeam.members.length}`})</h3>
                  {singleTeam.members.map((member) => {
                    return (
                      <li className="list_row">
                        <div>
                          <p className="member_name">{member.name}</p>
                          <p className="username">@{member.username}</p>
                        </div>
                        <div>
                          {singleTeam.owner.username !== member.username ? (
                            <>
                              {member.username == userInfo.username ? (
                                <>
                                  <CardPopup
                                    content={handleTeamDeleteWarnig(
                                      this.handleRemoveMember,
                                      member.username
                                    )}
                                    trigger={
                                      <nobr>
                                        <button>
                                          <i class="fas fa-sign-out-alt"></i>
                                          &nbsp;Leave
                                        </button>
                                      </nobr>
                                    }
                                  />{" "}
                                </>
                              ) : (
                                <>
                                  {userInfo.username ==
                                    singleTeam.owner.username && (
                                    <CardPopup
                                      content={handleTeamDeleteWarnig(
                                        this.handleRemoveMember,
                                        member.username
                                      )}
                                      trigger={
                                        <nobr>
                                          <button>
                                            <i class="fas fa-user-minus"></i>
                                            &nbsp;Remove
                                          </button>
                                        </nobr>
                                      }
                                    />
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <span>Admin</span>
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

function handleTeamDeleteWarnig(handleRemoveMember, username) {
  return (
    <>
      <div className="card_content_wrapper">
        <p className="card_heading">Remove Member</p>
        <hr />
        <div>
          <p className="card_text">
            Remove all access to the team. The member will remain on all their
            boards in this team. They will receive a notification.
          </p>
          <button
            className="link delbtn"
            onClick={() => handleRemoveMember(username)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

function mapStateToProps({ singleTeam, userInfo }) {
  return { singleTeam, userInfo };
}

export default connect(mapStateToProps)(TeamMember);
