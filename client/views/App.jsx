import React, { Component } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./components/Signup";
import {getCurrentUser} from "../store/action";
import ForgotPassword from "./components/ForgotPassword";

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
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </>
    );
  }
}

function mapStateToProp(state) {
  return { state };
}

export default connect(mapStateToProp)(App);
