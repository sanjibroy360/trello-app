import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSingleBoardInfo,
  getTeamList,
  reorderSameListCards,
  dragAndDropBetweenTwoList,
} from "../../store/action";
import BoardPageHeader from "./BoardPageHeader";
import Loader from "./Loader";
import ListCreateForm from "./ListCreateForm";
import Lists from "./Lists";
import { DragDropContext, Draggable, Dropable } from "react-beautiful-dnd";

class BoardPage extends Component {
  componentDidMount() {
    let slug = this.props.match.params.boardSlug;
    this.props.dispatch(getTeamList());
    return this.props.dispatch(getSingleBoardInfo(slug, this.props.history));
  }

  reOrder = (cardId, sourceListId, sourceIndex, destListId, destIndex) => {
    let card = "";
    let { allList } = this.props;
    let lists = allList;
    let fallBack = [...allList];
    let { boardSlug } = this.props.match.params;
    fallBack = fallBack.map((list) => {
      let arr = [...list.cards];
      return { ...list, cards: arr };
    });

    if (sourceListId == destListId) {
      let listIndex = lists.findIndex((list) => list._id == destListId);
      card = lists[listIndex].cards.splice(sourceIndex, 1);
      lists[listIndex].cards.splice(destIndex, 0, ...card);
      let list = lists[listIndex];
      return this.props.dispatch(
        reorderSameListCards(list, boardSlug, fallBack)
      );
    } else {
      let sourceListIndex = lists.findIndex((list) => list._id == sourceListId);
      let destListIndex = lists.findIndex((list) => list._id == destListId);
      let sourceList = lists[sourceListIndex];
      let destList = lists[destListIndex];
      card = sourceList.cards.splice(sourceIndex, 1);
      destList.cards.splice(destIndex, 0, ...card);
      destList.cards = destList.cards.map((card) => {
        card.listId = destListId;
        return card;
      });
      let payload = {
        sourceList,
        destList,
      };
      let cardSlug = card[0].slug;
      let successMsg = `${card[0].name} is shifted from ${sourceList.name} to ${destList.name}`;

      return this.props.dispatch(
        dragAndDropBetweenTwoList(
          payload,
          boardSlug,
          cardSlug,
          successMsg,
          fallBack
        )
      );
    }
  };

  onDragEnd = (response) => {
    let { userInfo, singleBoard } = this.props;
    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;
    if (!response.destination || !userInfo.token || !isMember) {
      return;
    }
    let destListId = response.destination.droppableId;
    let destIndex = response.destination.index;
    let sourceListId = response.source.droppableId;
    let sourceIndex = response.source.index;
    let cardId = response.draggableId;

    this.reOrder(cardId, sourceListId, sourceIndex, destListId, destIndex);
    console.log({ cardId, sourceListId, sourceIndex, destListId, destIndex });
  };

  render() {
    let { userInfo, singleBoard, teams } = this.props;

    if (!singleBoard.name && teams) {
      return <Loader />;
    }

    let isMember = singleBoard.teamId
      ? singleBoard.teamId.members.some(
          (memberId) => memberId == userInfo.id
        ) || null
      : userInfo.id && singleBoard.owner._id == userInfo.id;

    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="board_page_wrapper">
            <BoardPageHeader />

            <div className="list_wrapper">
              <Lists />
              {isMember ? <ListCreateForm /> : <></>}
            </div>
          </div>
        </DragDropContext>
      </>
    );
  }
}

function mapStateToProps({ singleBoard, allList, teams, userInfo }) {
  return { singleBoard, allList, teams, userInfo };
}
export default connect(mapStateToProps)(BoardPage);
