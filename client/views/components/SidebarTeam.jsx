import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CreateTeamForm from "./CreateTeamForm";
import { connect } from "react-redux";
import CreateTeamModal from "./CreateTeamModal";
import { getTeamList } from "../../store/action";

class SidebarTeam extends Component {
  componentDidMount() {
    return this.props.dispatch(getTeamList());
  }

  render() {
    let { teams } = this.props;
    console.log(teams);
    return (
      <>
        <div className="team_list">
          <p className="sidebar_heading">Teams</p>
          <ul className="ui vertical menu sidebar_menu">
            <li className="item">
              <label htmlFor="modalToggleBtn">+ Create a team</label>
            </li>
            {teams.length ? (
              teams.map((team) => {
                return (
                  <Link to={`/team/${team.slug}`}>
                    {" "}
                    <li className="item team_name">
                      <i class="fas fa-users"></i>&nbsp;{team.name}
                    </li>
                  </Link>
                );
              })
            ) : (
              <></>
            )}
          </ul>
          <CreateTeamModal content={() => <CreateTeamForm />} />
        </div>
      </>
    );
  }
}

function mapStateToProps({ teams }) {
  return { teams };
}

export default connect(mapStateToProps)(SidebarTeam);
