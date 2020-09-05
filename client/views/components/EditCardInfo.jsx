import React, { Component } from "react";
import { connect } from "react-redux";
import { editCardInfo } from "../../store/action";
import { Checkbox } from "semantic-ui-react";
import Loader from "./Loader";

class EditCardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isDone: false,
      description: "",
      enableEditMode: false,
      enableEditTitle: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.singleCard != this.props.singleCard) {
      let { name, isDone, description } = this.props.singleCard;
      return this.setState({ name, isDone, description });
    }
  }

  handleEditMode = () => {
    let { userInfo, singleBoard, singleCard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;
    if (isMember) {
      let card = singleCard;
      return this.setState({
        enableEditMode: !this.state.enableEditMode,
        name: card.name,
        description: card.description,
      });
    }
  };

  handleEditCardTitle = () => {
    let { userInfo, singleBoard, singleCard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;
    console.log(isMember);
    if (isMember) {
      let card = singleCard;
      return this.setState({
        enableEditTitle: !this.state.enableEditTitle,
        name: card.name,
        description: card.description,
      });
    }
  };

  handleIsDone = ({ target: { name, checked } }) => {
    let { isDone } = this.state;
    let { singleCard } = this.props;
    let { listSlug, slug } = singleCard;
    let payload = { isDone: checked };
    console.log(checked);
    return this.props.dispatch(editCardInfo(payload, listSlug, slug));
  };

  handleInput = ({ target: { name, value } }) => {
    return this.setState({ [name]: value });
  };

  handleEditDesc = () => {
    let { userInfo, singleBoard, singleCard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;
    if (isMember) {
      let { description } = singleCard;
      return this.setState({ description: description, enableEditMode: true });
    }
  };

  updateCardName = () => {
    let { name } = this.state;
    let cardSlug = this.props.singleCard.slug;
    let { listSlug } = this.props.singleCard;
    if (name.trim()) {
      this.setState({ enableEditTitle: false });
      return this.props.dispatch(editCardInfo({ name }, listSlug, cardSlug));
    }
  };

  handleSubmit = () => {
    let cardSlug = this.props.singleCard.slug;
    let { listSlug } = this.props.singleCard;
    let { description, name } = this.state;
    let payload = {};
    if (description.trim()) {
      payload.description = description.trim();
    }

    if (name.trim()) {
      payload.name = name.trim();
    }

    if (payload.name || payload.description) {
      this.setState({ enableEditMode: false });
      this.props.dispatch(editCardInfo(payload, listSlug, cardSlug));
    }
  };

  disableEditMode = () => {
    return this.setState({ enableEditMode: false });
  };

  formatDate = (date) => {
    date = new Date(date);
    date = date.toString().slice(0, 15).split(" ");

    let formatedDate = `${date[2]} ${date[1]}, ${date[3]}`;
    return formatedDate;
  };

  render() {
    let { userInfo, singleBoard, singleCard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;

    let card = singleCard;
    let {
      name,
      description,
      isDone,
      enableEditMode,
      enableEditTitle,
    } = this.state;

    let completed = "rgb(90,172,68)";
    let overdue = "rgb(207,80,61)";

    if (!card.name) {
      return <Loader />;
    }
    let isOverdue = false;
    if (card.dueDate) {
      isOverdue = new Date() > new Date(card.dueDate);
    }
    return (
      <div className="edit_card_form">
        {!enableEditTitle ? (
          <h2 className="card_name" onClick={this.handleEditCardTitle}>
            {card.name}
          </h2>
        ) : (
          <>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleInput}
              onBlur={this.updateCardName}
            />
          </>
        )}
        {card.dueDate ? (
          <>
            <h3 className="description">Due Date</h3>
            <div className="dueDate_wrapper">
              <div>
                {isMember ? (
                  <input
                    type="checkbox"
                    name="isDone"
                    checked={isDone}
                    onChange={this.handleIsDone}
                  />
                ) : (
                  <></>
                )}
              </div>
              <p className="date">{this.formatDate(card.dueDate)}</p>

              {isDone ? (
                <p>
                  {" "}
                  <span
                    className="badge"
                    style={{ backgroundColor: completed, color: "#fff" }}
                  >
                    {" "}
                    Completed
                  </span>
                </p>
              ) : isOverdue ? (
                <p>
                  <span
                    className="badge"
                    style={{ backgroundColor: overdue, color: "#fff" }}
                  >
                    {" "}
                    Overdue
                  </span>
                </p>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="desc_wrapper">
          <h3 className="description">Description</h3>
          <div>
            {card.description && !enableEditMode ? (
              <>
                <button onClick={this.handleEditDesc} className="btn">
                  Edit
                </button>{" "}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {card.description ? (
          <>
            {!enableEditMode ? (
              <>
                <p className="card_desc_text">{card.description}</p>
              </>
            ) : (
              <>
                <div className="card_desc_frame">
                  <textarea
                    placeholder="Add a more detailed description..."
                    className="card_desc"
                    value={description}
                    name="description"
                    onChange={this.handleInput}
                  ></textarea>
                  <div className="btn_wrapper">
                    <button
                      type="submit"
                      className="add_btn"
                      onClick={this.handleSubmit}
                    >
                      Add List
                    </button>
                    <button onClick={this.disableEditMode}>X</button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {!enableEditMode ? (
              <>
                {" "}
                <div
                  className="description_placeholder"
                  onClick={this.handleEditMode}
                  spellCheck="true"
                >
                  Add a more detailed description...
                </div>
              </>
            ) : (
              <>
                <div className="card_desc_frame">
                  <textarea
                    placeholder="Add a more detailed description..."
                    className="card_desc"
                    value={description}
                    name="description"
                    onChange={this.handleInput}
                  ></textarea>
                  <div className="btn_wrapper">
                    <button
                      type="submit"
                      className="add_btn"
                      onClick={this.handleSubmit}
                    >
                      Save
                    </button>
                    <button onClick={this.disableEditMode}>X</button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps({ allList, singleCard, singleBoard, userInfo }) {
  return { allList, singleCard, singleBoard, userInfo };
}

export default connect(mapStateToProps)(EditCardInfo);
