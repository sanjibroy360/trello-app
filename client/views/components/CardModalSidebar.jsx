import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import LabelPopup from "./LabelPopup";
import DueDatePopup from "./DueDatePopup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteCard } from "../../store/action";

class CardModalSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLabelPopup: false,
      openDueDatePopup: false,
    };
  }

  handleLabelPopup = () => {
    return this.setState({ openLabelPopup: !this.state.openLabelPopup });
  };

  handleDueDatePopup = () => {
    return this.setState({ openDueDatePopup: !this.state.openDueDatePopup });
  };

  handleDeleteCard = () => {
    let { singleCard } = this.props;
    let { slug, listSlug } = singleCard;
    return this.props.dispatch(deleteCard(listSlug, slug, this.props.history));
  };

  render() {
    let { openLabelPopup, openDueDatePopup } = this.state;
    return (
      <div className="grid">
        <div>
          <ul className="ui vertical menu card_sidebar_menu">
            <h3>ADD TO CARD</h3>
            <li>
              <p onClick={this.handleLabelPopup} className="item">
                Label
              </p>
              {openLabelPopup ? (
                <LabelPopup handleLabelPopup={this.handleLabelPopup} />
              ) : (
                <></>
              )}
            </li>
            <li>
              <p onClick={this.handleDueDatePopup} className="item">
                Due Date
              </p>
              {openDueDatePopup ? (
                <DueDatePopup handleDueDatePopup={this.handleDueDatePopup} />
              ) : (
                <></>
              )}
            </li>
            <li>
              <p className="item" onClick={this.handleDeleteCard}>
                Delete Card
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ allList, singleBoard, singleCard }) {
  return { allList, singleBoard, singleCard };
}

export default connect(mapStateToProps)(withRouter(CardModalSidebar));
