import React, { Component } from "react";

import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import EditCardInfo from "./EditCardInfo";
import CardModalSidebar from "./CardModalSidebar";
import Comment from "./Comment";
import { connect } from "react-redux";
import {
  getAllComments,
  addCurrentlyOpenCard,
  getAllList,
} from "../../store/action";
import Loader from "./Loader";
const customStyles = {
  content: {
    position: "absolute",
    top: "26%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginTop: "10%",
    marginBottom: "5%",
    width: "auto",
    transform: "translate(-47%, -50%)",
  },
};
Modal.setAppElement("#root");

class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  handleModalVisibility = () => {
    return this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  afterOpenModal = () => {
    let { card, listSlug } = this.props;
    let cardSlug = card.slug;
    let wrapper = document.querySelector(".ReactModal__Overlay");
    wrapper.setAttribute("id", "card_modal_background");

    this.props.dispatch(addCurrentlyOpenCard(listSlug, cardSlug));
    return this.props.dispatch(getAllComments(listSlug, cardSlug));
  };

  closeModal = () => {
    let boardSlug = this.props.match.params.boardSlug;
    this.props.dispatch(getAllList(boardSlug));
    return this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  render() {
    let { modalIsOpen } = this.state;
    let { card, listSlug } = this.props;
    if (!card._id) {
      return <Loader />;
    }
    let { userInfo, singleBoard } = this.props;

    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;
    return (
      <div>
        <div>
          <button
            id={card._id}
            className="modalToggleBtn"
            onClick={this.handleModalVisibility}
          >
            Open Modal
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <button onClick={this.closeModal} id="closeModalBtn">
            close
          </button>
          <div className="modal card_modal">
            <div className="modal_leftside">
              <EditCardInfo />
              <Comment />
            </div>
            <div className="modal_rightside">
              <label htmlFor="closeModalBtn" className="closeModal">
                <i class="fas fa-times close_btn_icon"></i>
              </label>
              {isMember ? <CardModalSidebar /> : <></>}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ comments, singleCard, userInfo, singleBoard }) {
  return { comments, singleCard, userInfo, singleBoard };
}

export default connect(mapStateToProps)(withRouter(CardModal));
