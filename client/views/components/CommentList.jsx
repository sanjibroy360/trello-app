import React, { Component } from "react";
import { connect } from "react-redux";
// import {getAllComments} from "../../store/action";
import CommentCard from "./CommentCard";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  render() {
    let { userInfo, singleBoard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;

    let { comments } = this.props;
    return (
      <div>
        {isMember ? (
          comments.map((comment) => {
            return <CommentCard comment={comment} />;
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}

function mapStateToProps({ comments, singleCard, singleBoard, userInfo }) {
  return { comments, singleCard, singleBoard, userInfo };
}

export default connect(mapStateToProps)(CommentList);
