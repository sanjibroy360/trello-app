import React, { Component } from "react";
import TeamEditForm from "./TeamEditForm";
import { connect } from "react-redux";

class TeamInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpen: 0,
    };
  }
  openForm = () => {
    return this.setState({ formIsOpen: 1 });
  };

  closeForm = () => {
    return this.setState({ formIsOpen: 0 });
  };
  render() {
    let { formIsOpen } = this.state;
    let { singleTeam } = this.props;
    return (
      <section className="team_page_head">
        <div className="team_page_container">
          <div className="team_info_wrapper">
            <div className="avatar">
              <i className="far fa-user"></i>
            </div>
            <div>
              {!formIsOpen ? (
                <>
                  <h2>{singleTeam.name}</h2>
                  <nobr>
                    <button onClick={this.openForm}>Edit Team Profile</button>
                  </nobr>
                </>
              ) : (
                <TeamEditForm closeForm={this.closeForm} />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ singleTeam }) {
  return { singleTeam };
}

export default connect(mapStateToProps)(TeamInfo);
