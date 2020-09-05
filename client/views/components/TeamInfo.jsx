import React, { Component } from "react";
import TeamEditForm from "./TeamEditForm";
import { connect } from "react-redux";
import Loader from "./Loader";

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
    let { singleTeam, userInfo } = this.props;
    console.log(singleTeam);
    if (!singleTeam.owner) {
      return <Loader />;
    }
    return (
      <section className="team_page_head">
        <div className="team_page_container">
          <div className="team_info_wrapper">
            <div className="avatar">
              <i class="fas fa-users"></i>
            </div>
            <div>
              {!formIsOpen ? (
                <>
                  <div className="team_info">
                    <h2>{singleTeam.name}</h2>
                    {singleTeam.description ? (
                      <p>{singleTeam.description}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  {singleTeam.owner._id == userInfo.id ? (
                    <>
                      <nobr>
                        <button onClick={this.openForm} className="edit_btn">
                          <i className="fas fa-pencil-alt "></i>&nbsp;Edit Team
                          Profile
                        </button>
                      </nobr>
                    </>
                  ) : (
                    <>
                      <nobr>
                        <button className="edit_btn disable">
                          <i className="fas fa-pencil-alt"></i>&nbsp;Edit Team
                          Profile
                        </button>
                      </nobr>
                    </>
                  )}
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

function mapStateToProps({ singleTeam, userInfo }) {
  return { singleTeam, userInfo };
}

export default connect(mapStateToProps)(TeamInfo);
