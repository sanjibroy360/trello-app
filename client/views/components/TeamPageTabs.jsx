import React from "react";
import { Tab } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import {withRouter} from "react-router-dom";

function TeamPageTabs(props) {
  console.log(props)
  let {teamSlug} = props.match.params;
  
  return (
    <div>
      <div className="ui attached tabular menu">
        <div className="tab">
          <Link
            to={`/team/${teamSlug}`}
            className={props.activeTab == "0" ? "item active" : "item"}
          >
            Boards
          </Link>
          <Link
            to={`/team/${teamSlug}/members`}
            activeClassName="active"
            className={props.activeTab == "1" ? "item active" : "item"}
          >
            Members
          </Link>
          <Link
            to={`/team/${teamSlug}/account`}
            activeClassName="active"
            className={props.activeTab == "2" ? "item active" : "item"}
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(TeamPageTabs);
