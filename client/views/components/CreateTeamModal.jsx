import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import CreateTeamForm from "./CreateTeamForm";
const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginTop: "10%",
    marginBottom: "5%",
    width: "60rem",

    margin: "10% auto 5% auto",
    transform: "translate(-47%, -50%)",
  },
};
Modal.setAppElement("#root");
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class CreateTeamModal extends Component {
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
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f80";
    // <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
  };

  closeModal = () => {
    return this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  render() {
    let { modalIsOpen } = this.state;
    const ref = React.createRef();
    return (
      <div>
        <div>
          <button
            id="modalToggleBtn"
            ref={ref}
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
          <div className="modal">
            <div className="modal_leftside">{this.props.content()}</div>
            <div className="modal_rightside">
              <label htmlFor="closeModalBtn" className="closeBtn">
                <i class="fas fa-times close_btn_icon"></i>
              </label>
              <img
                src="https://a.trellocdn.com/prgb/dist/images/organization/empty-board.286f8fc83e01c93ed27e.svg"
                alt="Modal image"
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateTeamModal;
