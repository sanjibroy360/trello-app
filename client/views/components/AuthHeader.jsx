import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import Logo from "./Logo";
import IconButton from "./IconButton";

function AuthHeader(props) {
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

                <NavLink to="#" activeClassName="active_link">
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
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default AuthHeader;
