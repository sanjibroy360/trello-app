import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";

class Header extends Component {
  render() {
    return (
      <>{this.props.userInfo.username ? <AuthHeader /> : <NonAuthHeader />}</>
    );
  }
}

function mapStateToProp({ userInfo }) {
  return { userInfo };
}

export default connect(mapStateToProp)(Header);
