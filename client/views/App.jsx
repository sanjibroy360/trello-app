import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./components/Signup";
import { getCurrentUser } from "../store/action";
import ForgotPassword from "./components/ForgotPassword";
import AllTeamsAndBoards from "./components/AllTeamsAndBoards";
import Templates from "./components/Templates";
import Feed from "./components/Feed";
import TeamPageTabs from "./components/TeamPageTabs";
import SingleTeamBoards from "./components/SingleTeamBoards";
import TeamSettings from "./components/TeamSettings";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.authToken) {
      this.props.dispatch(getCurrentUser(`Token ${localStorage.authToken}`));
    }
  }

  render() {
    return (
      <>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Feed} />
        <Route path="/boards" exact component={AllTeamsAndBoards} />
        <Route path="/templates" exact component={Templates} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/team/:teamSlug/account" exact component={TeamSettings} />
        <Route path="/team/:teamSlug" exact component={SingleTeamBoards} />
      </>
    );
  }
}

function mapStateToProp(state) {
  return { state };
}

export default connect(mapStateToProp)(App);
