const User = require("../model/user");
const Team = require("../model/team");
const Board = require("../model/board");
const Card = require("../model/card");
const Comment = require("../model/comment");
const List = require("../model/list");

const auth = require("../middleware/auth");

exports.addComment = async function (req, res, next) {
  try {
    let { listSlug, cardSlug } = req.params;
    let { userId } = req.user;
    let { text } = req.body.comment;
    if (!text) {
      return res.status(400).send(`Comment can't be empty.`);
    }
    let list = await List.findOne({ slug: listSlug }).populate("boardId");

    if (!list) {
      return res.status(400).send(`List not found.`);
    }
    let { teamId } = list.boardId;
    if (teamId) {
      let team = await Team.findById(teamId).exec(function (err, team) {
        let isMember = team.members.some((member) => member._id == userId);
        if (!isMember) {
          return res
            .status(400)
            .send(`Comments can be added only in team boards.`);
        }
      });
    }
    let card = await Card.findOne({ slug: cardSlug });
    if (!card) {
      return res.status(400).send(`Card not found.`);
    }
    req.body.comment.listId = list.id;
    req.body.comment.cardId = card.id;
    req.body.comment.memberId = userId;
    let comment = await Comment.create(req.body.comment);
    card = await Card.findByIdAndUpdate(
      card.id,
      {
        $addToSet: { comments: comment.id },
      },
      { new: true }
    );
    if (comment) {
      return res.status(200).json({ comment });
    }
  } catch (error) {
    next(error);
  }
};

exports.editComment = async function (req, res, next) {
  try {
    let { userId } = req.user;
    let { listSlug, cardSlug, commentId } = req.params;
    let comment = await Comment.findById(commentId);
    let card = await Card.findOne({ slug: cardSlug });
    let list = await List.findOne({ slug: listSlug });
    if (!card || !list || !comment) {
      return res.status(400).send(`Comment not found.`);
    }

    if (comment.memberId == userId) {
      comment = await Comment.findByIdAndUpdate(commentId, req.body.comment, {
        new: true,
      });
      return res.status(200).json({ comment });
    } else {
      return res.status(401).send(`You can only edit your comments.`);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async function (req, res, next) {
  try {
    let { listSlug, cardSlug, commentId } = req.params;
    let comment = await Comment.findById(commentId);
    let card = await Card.findOne({ slug: cardSlug });
    let list = await List.findOne({ slug: listSlug });
    if (!card || !list) {
      return res.status(400).send(`Comment not found.`);
    }
    let { userId } = req.user;
    if (comment.memberId == userId) {
      let comment = await Comment.findByIdAndDelete(commentId);
      card = await Card.findByIdAndUpdate(
        card.id,
        { $pull: { comments: comment.id } },
        { new: true }
      );
      return res.status(200).json({ comment });
    } else {
      return res.status(401).send(`You can only delete your comments.`);
    }
  } catch (error) {
    next(error);
  }
};

exports.singleCardComment = async function (req, res, next) {
  try {
    let { listSlug, cardSlug } = req.params;
    let card = await Card.findOne({ slug: cardSlug });
    let list = await List.findOne({ slug: listSlug });

    if (!list) {
      return res.status(400).send(`List not found.`);
    }

    if (!card) {
      return res.status(400).send(`Card not found`);
    }
    let comments = await Comment.find({
      cardId: card.id,
    }).populate("memberId");
    console.log(comments);
    return res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
};
