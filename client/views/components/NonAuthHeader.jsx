import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

function NonAuthHeader(props) {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="container nav_links">
          <Link to="/">
            <Logo />
          </Link>

          <ul className="nav_menu">
            <li>
              <nobr>
                <NavLink to="/login" activeClassName="active_link">
                  <button className="btn transparent_btn">Log In</button>
                </NavLink>
              </nobr>
            </li>
            <li>
              <nobr>
                <Link to="/signup">
                  <button className="btn blue_btn">Sign Up</button>
                </Link>
              </nobr>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NonAuthHeader;
