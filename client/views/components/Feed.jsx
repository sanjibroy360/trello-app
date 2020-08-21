import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreateBoardModal from "./CreateBoardModal";

class Feed extends Component {
  render() {
    return (
      <div className="container">
        <div className="feed">
          <div>
            <Sidebar />
          </div>
          <div className="feed_card">
            <div className="feed_card_img"></div>
            <div className="feed_card_text">
              <h3>Stay on track and up to date</h3>
              <p>
                Invite people to boards and cards, leave comments, add due
                dates, and we'll show the most important activity here.
              </p>
            </div>
          </div>
          <div className="grid">
            <ul className="ui vertical menu">
              <li>
                <label htmlFor="toggleCreateBoardModal" className="item">
                  <i class="fas fa-plus"></i>&nbsp;&nbsp;Create a board
                </label>
              </li>
            </ul>
          </div>
          <CreateBoardModal />
        </div>
      </div>
    );
  }
}

export default Feed;
