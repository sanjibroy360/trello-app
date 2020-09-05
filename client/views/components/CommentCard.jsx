import React, { Component } from "react";
import { connect } from "react-redux";
import { editComment, deleteComment } from "../../store/action";

class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      enableEditMode: false,
    };
  }

  handleInput = (event) => {
    let { name, value } = event.target;
    let { enableEditMode } = this.state;
    if (enableEditMode) {
      event.target.style.height = "inherit";
      event.target.style.height = `${event.target.scrollHeight}px`;
      return this.setState({ [name]: value });
    }
  };

  handleSubmit = () => {
    let { text } = this.state;
    let card = this.props.singleCard;
    let { listSlug } = card;
    let { comment } = this.props;
    let cardSlug = card.slug;
    let commentId = comment._id;
    let { name } = this.props.userInfo;
    if (text.trim()) {
      this.setState({ enableEditMode: false });
      return this.props.dispatch(
        editComment({ text }, listSlug, cardSlug, commentId, name)
      );
    }
  };

  handleEditComment = () => {
    let { comment } = this.props;
    return this.setState({ enableEditMode: true, text: comment.text });
  };

  disableEditMode = () => {
    return this.setState({ enableEditMode: false });
  };

  handleDeleteComment = () => {
    let card = this.props.singleCard;
    let { listSlug } = card;
    let { comment } = this.props;

    let cardSlug = card.slug;
    let commentId = comment._id;
    let { enableEditMode } = this.state;
    if (!enableEditMode) {
      return this.props.dispatch(deleteComment(listSlug, cardSlug, commentId));
    }
  };

  render() {
    let { comment, userInfo } = this.props;
    let { text, enableEditMode } = this.state;
    return (
      <>
        {!enableEditMode ? (
          <>
            <div className="comment_card" key={comment._id}>
              <h4 className="commenter">{comment.memberId.name}</h4>
              <div className="comment_frame">{comment.text}</div>
              {comment.memberId._id == userInfo.id ? (
                <>
                  <span className="small_text" onClick={this.handleEditComment}>
                    Edit
                  </span>
                  <span
                    className="small_text"
                    onClick={this.handleDeleteComment}
                  >
                    Delete
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="comment_frame" key={comment._id}>
              <textarea
                name="text"
                value={text}
                className="card_comment"
                placeholder="Write a comment..."
                onChange={this.handleInput}
              ></textarea>

              <div className="btn_wrapper">
                {!text ? (
                  <>
                    <button type="submit" className="add_btn disable">
                      Save
                    </button>
                    <button onClick={this.disableEditMode}>X</button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="add_btn"
                      onClick={this.handleSubmit}
                    >
                      Save
                    </button>
                    <button onClick={this.disableEditMode}>X</button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps({ comments, userInfo, singleCard }) {
  return { comments, userInfo, singleCard };
}

export default connect(mapStateToProps)(CommentCard);
