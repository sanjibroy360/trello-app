import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./components/Signup";
import { getCurrentUser, verifyUser } from "../store/action";
import ResetPassword from "./components/ResetPassword";
import AllTeamsAndBoards from "./components/AllTeamsAndBoards";
import Templates from "./components/Templates";
import Feed from "./components/Feed";
import TeamPageTabs from "./components/TeamPageTabs";
import SingleTeamBoards from "./components/SingleTeamBoards";
import TeamSettings from "./components/TeamSettings";
import TeamMember from "./components/TeamMember";
import BoardPage from "./components/BoardPage";
import Loader from "./components/Loader";
import BoardNotFound from "./components/BoardNotFound";
import PageNotFound from "./components/PageNotFound";
import Logout from "./components/Logout";
import TeamNotFound from "./components/TeamNotFound";
import VerifyUser from "./components/VerifyUser";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NonAuthRoutes() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/verify" exact component={VerifyUser} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/logged-out" exact component={Logout} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route path="/board/:boardSlug" exact component={BoardPage} />

        <Route path="/team/:teamSlug/members" exact component={TeamMember} />
        <Route path="/team/:teamSlug/account" exact component={TeamSettings} />
        <Route path="/team/:teamSlug" exact component={SingleTeamBoards} />
        <Route
          path="/error/team/:teamSlug/not-found"
          exact
          component={TeamNotFound}
        />

        <Route
          path="/error/board/:boardSlug/board-not-found"
          exact
          component={BoardNotFound}
        />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function AuthRoutes() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={AllTeamsAndBoards} />
        <Route path="/home" exact component={Feed} />
        <Route path="/boards" exact component={AllTeamsAndBoards} />
        <Route path="/templates" exact component={Templates} />
        <Route path="/logged-out" exact component={Logout} />
        <Route path="/team/:teamSlug/members" exact component={TeamMember} />
        <Route path="/team/:teamSlug/account" exact component={TeamSettings} />
        <Route path="/team/:teamSlug" exact component={SingleTeamBoards} />
        <Route path="/board/:boardSlug" exact component={BoardPage} />
        <Route
          path="/error/team/:teamSlug/not-found"
          exact
          component={TeamNotFound}
        />
        <Route
          path="/error/board/:boardSlug/board-not-found"
          exact
          component={BoardNotFound}
        />

        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.authToken) {
      return this.props.dispatch(
        getCurrentUser(`Token ${localStorage.authToken}`)
      );
    }
  }

  render() {
    let { userInfo } = this.props;
    if (localStorage.authToken && !userInfo.name) {
      return <Loader />;
    }

    return (
      <>
        <Header />

        {userInfo.token ? <AuthRoutes /> : <NonAuthRoutes />}
        <ToastContainer
          className="toast"
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

function mapStateToProp({ userInfo }) {
  return { userInfo };
}

export default connect(mapStateToProp)(App);
