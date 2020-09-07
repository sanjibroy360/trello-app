const User = require("../model/user");
const Team = require("../model/team");
const Board = require("../model/board");
const Card = require("../model/card");
const Comment = require("../model/comment");
const List = require("../model/list");

const auth = require("../middleware/auth");

exports.createList = async function (req, res, next) {
  try {
    let { name } = req.body.list;
    let boardSlug = req.params.boardSlug;
    if (!name) {
      return res.status(400).send(`List name is required.`);
    }

    req.body.list.memberId = req.user.userId;
    let board = await Board.findOne({ slug: boardSlug });
    if (!board) {
      return res.status(400).send(`List not found`);
    }
    let boardId = board.id;

    req.body.list.boardId = boardId;
    let list = await List.create(req.body.list);
    if (list) {
      let board = await Board.findByIdAndUpdate(
        boardId,
        {
          $addToSet: { lists: list.id },
        },
        { new: true }
      );
    }
    return res.status(200).json({ list });
  } catch (error) {
    next(error);
  }
};

exports.singleBoardLists = async function (req, res, next) {
  try {
    let boardSlug = req.params.boardSlug;
    let board = await Board.findOne({ slug: boardSlug });

    let boardId = board.id;
    let lists = await List.find({ boardId }).populate("cards");

    return res.status(200).json({ lists });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllCardsOfTheList = async function (req, res, next) {
  try {
    let { listSlug, boardSlug } = req.params;
    let list = await List.findOne({ slug: listSlug });
    if (!list) {
      return res.status(400).send(`List not found.`);
    }
    let card = await Card.deleteMany({ listId: list.id });
    list = await List.findByIdAndUpdate(list.id, { cards: [] }, { new: true });
    if (list) {
      return res.status(200).json({ list });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteList = async function (req, res, next) {
  let listSlug = req.params.listSlug;
  let boardSlug = req.params.boardSlug;
  let list = await List.findOneAndDelete({ slug: listSlug });
  if (!list) {
    return res.status(400).send(`List not found.`);
  }
  let board = await Board.findOneAndUpdate(
    { slug: boardSlug },
    {
      $pull: { lists: list.id },
    },
    { new: true }
  ).populate("cards");
  return res.status(200).json({ list });
};

exports.updateList = async function (req, res, next) {
  try {
    let { boardSlug, listSlug } = req.params;
    let board = await Board.findOne({ slug: boardSlug });
    let list = await List.findOne({ boardId: board.id, slug: listSlug });
    if (!board || !list) {
      return res.status(404).send(`List not found.`);
    }
    if (req.body.list.name && req.body.list.name != list.name) {
      req.body.list.slug = list.generateSlug(req.body.list.name);
    }
    list = await List.findByIdAndUpdate(list.id, req.body.list, {
      new: true,
    }).populate("cards");

    if (list) {
      return res.status(200).json({ list });
    }
    return res.status(400).send(`List not found.`);
  } catch (error) {
    next(error);
  }
};

exports.reorderCards = async function (req, res, next) {
  try {
    let { cards, _id } = req.body.list;

    let list = await List.findByIdAndUpdate(
      _id,
      { cards },
      { new: true }
    ).populate("cards");
    if (list) {
      return res.status(200).json({ list });
    }
  } catch (error) {
    next(error);
  }
};

exports.reorderCardsBetweenTwoList = async function (req, res, next) {
  try {
    let { sourceList, destList, cardSlug } = req.body.payload;
    let sourceListId = sourceList._id;
    let sourceListCards = sourceList.cards;
    let destListId = destList._id;
    let destListCards = destList.cards;

    sourceList = await List.findByIdAndUpdate(
      sourceListId,
      {
        cards: sourceListCards,
      },
      { new: true }
    ).populate("cards");

    destList = await List.findByIdAndUpdate(
      destListId,
      { cards: destListCards },
      { new: true }
    ).populate("cards");
    let card = await Card.findOneAndUpdate(
      { listId: destList.id },
      { new: true }
    );
    let updatedLists = { sourceList, destList };
    return res.status(200).json({ updatedLists });
  } catch (error) {
    next(error);
  }
};
