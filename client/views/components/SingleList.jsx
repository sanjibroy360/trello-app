import React, { Component } from "react";
import { connect } from "react-redux";
import { Loader } from "./Loader";
import SingleCard from "./SingleCard";
import CardCreateForm from "./CardCreateForm";
import { editListInfo } from "../../store/action";
import { withRouter } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { deleteAllCardsInTheList, deleteList } from "../../store/action";
import CardPopup from "./CardPopup";

class SingleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      enableListEditMode: false,
      openCardComposer: false,
      isOpenPopup: false,
    };
  }

  componentDidMount() {
    return this.setState({ name: this.props.list.name });
  }

  componentDidUpdate(prevProps, prevState) {
    let name = this.props.list.name;
    let prevName = prevProps.list.name;
    if (this.props != prevProps) {
      return this.setState({ name });
    }
  }

  handleCardComposer = () => {
    let { openCardComposer } = this.state;
    return this.setState({ openCardComposer: !openCardComposer });
  };

  handlePopup = () => {
    return this.setState({ isOpenPopup: !this.state.isOpenPopup });
  };

  handleEditMode = () => {
    let { userInfo, singleBoard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;
    if (isMember) {
      let { enableListEditMode } = this.state;
      return this.setState({ enableListEditMode: !enableListEditMode });
    }
  };

  handleInput = ({ target: { name, value } }) => {
    return this.setState({ [name]: value });
  };

  updateListInfo = () => {
    let { name } = this.state;
    let { boardSlug } = this.props.match.params;
    let listSlug = this.props.list.slug;
    name = name.trim();
    if (!name) {
      this.handleEditMode();
      return this.setState({ name: "" });
    }
    this.handleEditMode();
    return this.props.dispatch(editListInfo({ name }, boardSlug, listSlug));
  };

  handleArchiveCards = () => {
    let { list } = this.props;
    let listSlug = list.slug;
    let boardSlug = this.props.match.params.boardSlug;
    console.log({ listSlug, boardSlug });
    this.handlePopup();
    this.props.dispatch(deleteAllCardsInTheList(boardSlug, listSlug));
  };

  onDragEnd = (response) => {
    return;
  };

  handleDeleteList = () => {
    let { list } = this.props;
    let listSlug = list.slug;
    let boardSlug = this.props.match.params.boardSlug;
    console.log(boardSlug);
    this.handlePopup();
    this.props.dispatch(deleteList(boardSlug, listSlug));
  };

  render() {
    let { list } = this.props;
    let { enableListEditMode, name } = this.state;
    let listSlug = list.slug;

    let { userInfo, singleBoard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;

    if (!list.cards) {
      return <Loader />;
    }
    return (
      <Droppable droppableId={list._id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            <div className="list">
              {!enableListEditMode ? (
                <>
                  <div className="list_header">
                    <h2 className="title" onClick={this.handleEditMode}>
                      {list.name}
                    </h2>
                    {isMember ? (
                      <>
                        {" "}
                        <div className="list_edit">
                          <CardPopup
                            content={handleTeamDeleteWarnig(
                              this.handleArchiveCards,
                              this.handleDeleteList,
                              this.handlePopup
                            )}
                            open={this.state.isOpenPopup}
                            trigger={
                              <button>
                                <nobr>
                                  <span
                                    className="icon"
                                    onClick={this.handlePopup}
                                  >
                                    ...
                                  </span>
                                </nobr>
                              </button>
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <input
                    className="edit_list_name"
                    type="text"
                    name="name"
                    value={name}
                    onBlur={this.updateListInfo}
                    onChange={this.handleInput}
                  />
                </>
              )}

              <ul>
                {list.cards &&
                  list.cards.map((card, pos) => {
                    return (
                      <Draggable
                        key={card._id}
                        draggableId={card._id}
                        index={pos}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SingleCard
                              card={card}
                              listSlug={this.props.list.slug}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
              </ul>
              {isMember ? (
                <>
                  {!this.state.openCardComposer ? (
                    <>
                      <p className="add_card" onClick={this.handleCardComposer}>
                        + Add a card
                      </p>
                    </>
                  ) : (
                    <>
                      <CardCreateForm
                        closeCardComposer={this.handleCardComposer}
                        listSlug={listSlug}
                      />
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </Droppable>
    );
  }
}

function handleTeamDeleteWarnig(
  handleArchiveCards,
  handleDeleteList,
  handlePopup
) {
  return (
    <>
      <div className="list_popup_wrapper">
        <p className="popup_heading">
          List Actions
          <span className="close_btn" onClick={handlePopup}>
            <i className="fas fa-times"></i>
          </span>
        </p>

        <hr />
        <div>
          <ul className="popup_list">
            <li>
              <p onClick={handleArchiveCards}>Delete All cards in this list</p>
            </li>
            <li>
              <p onClick={handleDeleteList}>Delete this list</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function mapStateToProps({ allList, singleBoard, userInfo }) {
  return { allList, singleBoard, userInfo };
}

export default connect(mapStateToProps)(withRouter(SingleList));
