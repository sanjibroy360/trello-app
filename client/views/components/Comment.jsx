import React, { Component } from "react";
import { addComment } from "../../store/action";
import { connect } from "react-redux";
import CommentList from "./CommentList";
import Avatar from "./Avatar";
import Loader from "./Loader";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleInput = (event) => {
    // event.target.style.height = "inherit";
    // event.target.style.height = `${event.target.scrollHeight}px`;
    let { name, value } = event.target;
    console.log(value);
    return this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let { comment } = this.state;
    let payload = {
      text: comment,
    };
    let card = this.props.singleCard;
    let { listSlug } = card;

    let cardSlug = card.slug;
    if (comment.trim()) {
      this.setState({ comment: "" });
      return this.props.dispatch(addComment(payload, listSlug, cardSlug));
    }
  };

  render() {
    let { comment } = this.state;
    let card = this.props.singleCard;
    let { listSlug } = card;
    let { userInfo, singleBoard, singleCard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;
    return (
      <div>
        <div>
          <h3 className="activity">Activity</h3>
        </div>
        {isMember ? (
          <>
            {" "}
            <div className="comment_frame">
              <textarea
                name="comment"
                value={comment}
                className="card_comment"
                placeholder="Write a comment..."
                onChange={this.handleInput}
              ></textarea>

              <div className="btn_wrapper">
                <button
                  type="submit"
                  className="add_btn"
                  onClick={this.handleSubmit}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {singleCard.memberId ? (
              <div className="card_details">
                <div>
                  <Avatar>{singleCard.memberId.name}</Avatar>
                </div>
                <p>
                  <span className="owner"> {singleCard.memberId.name}</span>{" "}
                  added this card to {singleCard.listId.name} 
                </p>
              </div>
            ) : (
              <Loader />
            )}
          </>
        )}

        {/* Comment Cards */}

        <CommentList listSlug={listSlug} card={card} />
      </div>
    );
  }
}

function mapStateToProps({ comments, singleCard, singleBoard, userInfo }) {
  return { comments, singleCard, singleBoard, userInfo };
}

export default connect(mapStateToProps)(Comment);
