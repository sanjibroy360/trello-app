import React, { Component } from "react";

// import { Tab } from "semantic-ui-react";
import Sidebar from "./Sidebar";
// import BoardHome from "./BoardList";
import { Link } from "react-router-dom";


class Templates extends Component {
  render() {
    return (
        <div className="container auth_home ">
          <Sidebar />
          <div className="leftside_component">
            <p>Templates</p>
          </div>
        </div>
      );
  }
}

export default Templates;
