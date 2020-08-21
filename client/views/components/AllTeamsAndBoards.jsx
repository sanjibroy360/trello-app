import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import BoardList from "./BoardList";
import { Link } from "react-router-dom";
import { Templates } from "./Templates";

class AuthHome extends Component {
  render() {
    return (
      <div className="container auth_home ">
        <Sidebar />
        <div className="leftside_component">
          <BoardList />
        </div>
      </div>
    );
  }
}

export default AuthHome;
