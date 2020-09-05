import React, { Component } from "react";
import CardModal from "./CardModal";
import { connect } from "react-redux";

class SingleCard extends Component {
  formatDate = (date) => {
    date = date.toString().slice(0, 10).split(" ");
    let formatedDate = date[2] + " " + date[1];
    return formatedDate;
  };

  render() {
    let { card, listSlug, userInfo, singleBoard } = this.props;

    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;

    let noOfComments = 0;
    let completed = "rgb(90,172,68)";
    let overdue = "rgb(207,80,61)";
    let textColor = "#5e6c84";
    let dueDate = "";
    let color = "#fff";
    if (card.comments) noOfComments = card.comments.length;
    if (card.dueDate) {
      let today = new Date();
      dueDate = new Date(card.dueDate);
      if (dueDate < today) {
        color = overdue;
        textColor = "#fff";
      }
    }
    if (card.isDone) {
      color = completed;
      textColor = "#fff";
    }

    return (
      <label htmlFor={card._id}>
        <div>
          <li className="card">
            <div className="labels">
              {card.labelColors &&
                card.labelColors.map((color) => {
                  return (
                    <span
                      style={{ backgroundColor: `${color}` }}
                      className="mark"
                    ></span>
                  );
                })}
            </div>
            <div className="card_mid">
              <p className="card_title">{card.name}</p>
              <p>
                {isMember ? (
                  <i className="fas fa-pencil-alt edit_icon"></i>
                ) : (
                  <i class="far fa-eye edit_icon"></i>
                )}
              </p>
            </div>
            <div className="card_footer">
              {dueDate ? (
                <>
                  <nobr>
                    <p
                      className="badge"
                      style={{ backgroundColor: color, color: textColor }}
                    >
                      <i class="far fa-clock"></i> {this.formatDate(dueDate)}
                    </p>
                  </nobr>
                </>
              ) : (
                <></>
              )}
              {card.description ? (
                <>
                  <p className="badge">
                    <i className="fas fa-align-left desc_icon"></i>
                  </p>
                </>
              ) : (
                <></>
              )}
              {noOfComments ? (
                <>
                  <p className="badge">
                    <i className="far fa-comment-alt"></i> {noOfComments}
                  </p>
                </>
              ) : (
                <> </>
              )}
            </div>
          </li>

          <CardModal listSlug={listSlug} card={card} />
        </div>
      </label>
    );
  }
}

function mapStateToProps({ singleBoard, userInfo }) {
  return { singleBoard, userInfo };
}

export default connect(mapStateToProps)(SingleCard);
