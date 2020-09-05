const User = require("../model/user");
const Team = require("../model/team");
const Board = require("../model/board");
const Card = require("../model/card");
const Comment = require("../model/comment");
const List = require("../model/list");

const auth = require("../middleware/auth");

exports.createBoard = async function (req, res, next) {
  try {
    req.body.board.owner = req.user.userId;
    let { name } = req.body.board;
    if (!name) {
      return res.status(400).send(`Board name is required.`);
    }
    let board = await Board.create(req.body.board);
    if (board) {
      let user = await User.findByIdAndUpdate(
        req.user.userId,
        { $addToSet: { boardId: board.id } },
        { new: true }
      );

      if (board.teamId) {
        let team = await Team.findByIdAndUpdate(
          board.teamId,
          { $addToSet: { boardId: board.id } },
          { new: true }
        );
      }
      return res.status(200).json({ board });
    }
  } catch (error) {
    next(error);
  }
};

exports.addTeam = async function (req, res, next) {
  try {
    let teamSlug = req.params.teamSlug;
    let boardSlug = req.params.boardSlug;
    let team = await Team.findOne({ slug: teamSlug });
    let board = await Board.findOne({ slug: boardSlug });
    if (!team) {
      res.status(400).send(`Team not found!`);
    } else if (!board) {
      return res.status(400).send(`Board not found!`);
    }
    if (board.owner == req.user.userId) {
      board = await Board.findByIdAndUpdate(
        board.id,
        { teamId: team.id },
        { new: true }
      );
      team = await Team.findByIdAndUpdate(
        team.id,
        { $addToSet: { boardId: board.id } },
        { new: true }
      );
      return res.status(200).json({ board });
    } else {
      return res.status(400).send(`Only board creator can add team.`);
    }
  } catch (error) {
    next(error);
  }
};

exports.allTeamBoards = async function (req, res, next) {
  try {
    let user = await User.findById(req.user.userId);
    let boards = await Board.find({ teamId: { $in: user.teamId } }).populate(
      "teamId"
    );
    return res.status(200).json({ boards });
  } catch (error) {
    next(error);
  }
};

exports.allPersonalBoards = async function (req, res, next) {
  try {
    let boards = await Board.find({ owner: req.user.userId, teamId: null });
    return res.status(200).json({ boards });
  } catch (error) {
    next(error);
  }
};

exports.updateBoard = async function (req, res, next) {
  try {
    let slug = req.params.boardSlug;
    let board = await Board.findOne({ slug });
    if (!board) {
      return res.status(400).send(`Board not found.`);
    }
    if (req.body.board.name && req.body.board.name != board.name) {
      req.body.board.slug = board.generateSlug(req.body.board.name);
    }

    if (board.owner == req.user.userId) {
      board = await Board.findByIdAndUpdate(board.id, req.body.board, {
        new: true,
      }).populate("teamId owner");
      return res.status(200).json({ board });
    } else {
      return res
        .status(400)
        .send(`Only board creator can update board information.`);
    }
  } catch (error) {
    next(error);
  }
};

exports.singleBoardInfo = async function (req, res, next) {
  try {
    let board = await Board.findOne({ slug: req.params.boardSlug }).populate(
      "teamId lists owner",
      "-password"
    );
    console.log({ board });
    if (!board) {
      return res.status(400).send(`Board not found.`);
    }
    if (board.isPublic || board.owner == req.user.userId) {
      console.log("reached");
      return res.status(200).json({ board });
    }

    if (board.teamId) {
      await Board.findById(board.id)
        .populate("teamId owner lists", "-password")
        .exec(function (err, board) {
          let isMember = board.teamId.members.some(
            (member) => member == req.user.userId
          );

          if (isMember) {
            return res.status(200).json({ board });
          } else {
            return res.status(400).send(`Board not found.`);
          }
        });
    } else {
      return res.status(200).json({ board });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteBoard = async function (req, res, next) {
  try {
    let { userId } = req.user;
    let { boardSlug } = req.params;
    let board = await Board.findOne({ slug: boardSlug });
    if (!board) {
      return res.status(400).send("Board not found.");
    }
    if (board.owner == userId) {
      let lists = await List.deleteMany({ boardId: board.id });
      let card = await Card.deleteMany({ boardId: board.id });
      board = await Board.findByIdAndDelete(board.id);
      return res.status(200).send(`Board deleted successfuly.`);
    } else {
      return res.status(401).send(`Only board creator can delete this board.`);
    }
  } catch (error) {
    next(error);
  }
};
