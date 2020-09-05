import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import Logo from "./Logo";
import Avatar from "./Avatar";
import IconButton from "./IconButton";
import CardPopup from "./CardPopup";
import { withRouter } from "react-router-dom";
import { LOG_OUT } from "../../store/types";

class AuthHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
    };
  }

  handlePopup = () => {
    return this.setState({ isPopupOpen: !this.state.isPopupOpen });
  };

  handleLogout = () => {
    localStorage.clear();
    this.handlePopup();
    this.props.dispatch({ type: LOG_OUT });
    this.props.history.push("/logged-out");
  };

  render() {
    let { userInfo } = this.props;
    return (
      <div>
        <header className="header">
          <nav className="navbar">
            <div className="container nav_links">
              <ul className="auth_nav">
                <li className="auth_nav_left">
                  <NavLink to="#" activeClassName="active_link">
                    <IconButton>
                      <i className="fas fa-th"></i>
                    </IconButton>
                  </NavLink>

                  <NavLink to="/home" activeClassName="active_link">
                    <IconButton>
                      <i className="fas fa-home"></i>
                    </IconButton>
                  </NavLink>

                  <NavLink to="/boards" activeClassName="active_link">
                    <IconButton>
                      <i className="fab fa-trello"></i> Boards
                    </IconButton>
                  </NavLink>
                </li>
                <li>
                  <Link to="/">
                    <Logo />
                  </Link>
                </li>
                <li className="auth_nav_right">
                  <NavLink to="#" activeClassName="active_link">
                    <IconButton>
                      <i className="fas fa-plus"></i>
                    </IconButton>
                  </NavLink>

                  <NavLink to="#" activeClassName="active_link">
                    <IconButton>
                      <i className="fas fa-info"></i>
                    </IconButton>
                  </NavLink>

                  <NavLink to="#" activeClassName="active_link">
                    <IconButton>
                      <i className="far fa-bell"></i>
                    </IconButton>
                  </NavLink>
                  <CardPopup
                    content={logoutPopup(
                      userInfo,
                      this.handleLogout,
                      this.handlePopup
                    )}
                    trigger={
                      <span onClick={this.handlePopup}>
                        <Avatar>{userInfo.name}</Avatar>
                      </span>
                    }
                    open={this.state.isPopupOpen}
                  />
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

function logoutPopup(user, handleLogout, handlePopup) {
  return (
    <>
      <div className="logout_popup">
        <span className="close_btn" onClick={handlePopup}>
          <i className="fas fa-times"></i>
        </span>
        <div className="user_info">
          <Avatar>{user.name}</Avatar>
          <div>
            <p className="name">{user.name}</p>
            <p className="email">{user.email}</p>
          </div>
        </div>
        <hr />
        <ul className="actions">
          <li>Profile</li>
          <li>Settings</li>
          <li>
            <p onClick={handleLogout}>Log Out</p>
          </li>
        </ul>
      </div>
    </>
  );
}

function mapStateToProps({ userInfo }) {
  return { userInfo };
}

export default connect(mapStateToProps)(withRouter(AuthHeader));
