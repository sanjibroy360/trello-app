const User = require("../model/user");
const Team = require("../model/team");
const Board = require("../model/board");
const Card = require("../model/card");
const Comment = require("../model/comment");
const List = require("../model/list");

const auth = require("../middleware/auth");

exports.addCard = async function (req, res, next) {
  try {
    let { listSlug } = req.params;
    console.log(listSlug);
    req.body.card.memberId = req.user.userId;
    let list = await List.findOne({ slug: listSlug });
    if (!list) {
      return res.status(400).send(`List not found.`);
    }
    req.body.card.boardId = list.boardId;
    req.body.card.listId = list.id;
    let card = await Card.create(req.body.card);

    list = await List.findByIdAndUpdate(
      list.id,
      {
        $addToSet: { cards: card.id },
      },
      { new: true }
    );

    return res.status(200).json({ card });
  } catch (error) {
    next(error);
  }
};

exports.editCard = async function (req, res, next) {
  try {
    let { listSlug, cardSlug } = req.params;
    let list = await List.findOne({ slug: listSlug });
    let card = null;
    if (!list) {
      return res.status(400).send(`Card not found!`);
    }
    card = await Card.findOne({ slug: cardSlug });

    if (!card) {
      return res.status(400).send(`Card not found!`);
    }

    if (req.body.card.name && req.body.card.name != card.name) {
      req.body.card.slug = card.generateSlug(req.body.card.name);
    }

    card = await Card.findByIdAndUpdate(card.id, req.body.card, {
      new: true,
    }).populate("memberId listId", "-password");
    return res.status(200).json({ card });
  } catch (error) {
    next(error);
  }
};

exports.deleteCard = async function (req, res, next) {
  try {
    let { listSlug, cardSlug } = req.params;
    let list = await List.findOne({ slug: listSlug });
    let card = await Card.findOne({ slug: cardSlug });
    if (!card || !list) {
      return res.status(400).send(`Card not found.`);
    }

    if (card.memberId != req.user.userId) {
      return res.status(401).send(`Only card author can delete this card.`);
    }
    card = await Card.findByIdAndDelete(card.id);
    if (card) {
      return res.status(200).json({ card });
    }
  } catch (error) {
    next(error);
  }
};

exports.singleCardInfo = async function (req, res, next) {
  try {
    let { listSlug, cardSlug } = req.params;
    let list = await List.findOne({ slug: listSlug });
    console.log({ list });
    if (!list) {
      return res.status(400).send("Card not found!");
    }

    let card = await Card.findOne({ slug: cardSlug }).populate(
      "listId memberId",
      "-password"
    );
    console.log({ card });
    if (!card) {
      return res.status(400).send("Card not found!");
    }

    return res.status(200).json({ card });
  } catch (error) {
    next(error);
  }
};
