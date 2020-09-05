import React from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarTeam from "./SidebarTeam";


function Sidebar(props) {
  return (
    <div className="grid">
      <div>
        <ul className="ui vertical menu sidebar_menu">
          <li>
            <NavLink to="/boards" activeClassName="active" className="item">
              <i className="fab fa-trello"></i> Boards
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/home" activeClassName="active" className="item">
            <i class="fas fa-home"></i>Home
            </NavLink>
          </li>
        </ul>
        <SidebarTeam />
      </div>
    </div>
  );
}

export default Sidebar;
