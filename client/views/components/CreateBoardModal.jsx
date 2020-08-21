import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import CreateBoardForm from "./CreateBoardForm";
const customStyles = {
  content: {
    position: "absolute",
    top: "5%",
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
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class CreateBoardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  handleModalVisibility = () => {
    console.log("clicked!");
    return this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  afterOpenModal = () => {
    let wrapper = document.querySelector(".ReactModal__Overlay");
    wrapper.setAttribute("id", "black_blur_background");
    console.log(wrapper);
  };

  closeModal = () => {
    return this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  render() {
    let { modalIsOpen } = this.state;
    return (
      <div className="create_board_modal">
        <div>
          <button
            id="toggleCreateBoardModal"
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
          <button onClick={this.closeModal} id="closeCreateBoardModal">
            close
          </button>
          <CreateBoardForm />
        </Modal>
      </div>
    );
  }
}

export default CreateBoardModal;
