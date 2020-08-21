const express = require("express");
const router = express.Router();
const User = require("../../model/user");
const Team = require("../../model/team");
const Board = require("../../model/board");
const auth = require("../../utils/auth");

router.post("/create", auth.verifyToken, async function (req, res, next) {
  try {
    req.body.board.owner = req.user.userId;
    let {name} = req.body.board;
    if(!name) {
      return res.status(400).send(`Board name is required.`)
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
});

router.post("/:boardSlug/add-team/:teamSlug", auth.verifyToken, async function (
  req,
  res,
  next
) {
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
});

router.get("/all", auth.verifyToken, async function (req, res, next) {
  try {
    let teams = await User.findById(req.user.userId)
      .populate("boardId", "-createdAt -updatedAt")
      .exec(function (error, user) {
        if (error) {
          return res.status(400).json({ error });
        }
        return res.status(200).json({ boards: user.boardId });
      });
  } catch (error) {
    next(error);
  }
});

router.put("/:boardSlug/update", auth.verifyToken, async function (
  req,
  res,
  next
) {
  try {
    let slug = req.params.boardSlug;
    let board = await Board.findOne({ slug });
    if (!board) {
      return res.status(400).send(`Board not found.`);
    }
    if (board.owner == req.user.userId) {
      board = board.findByIdAndUpdate(board.id, req.body.board);
      return res.status(200).json({ board });
    } else {
      return res
        .status(400)
        .send(`Only board creator can update board information.`);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:boardSlug", auth.verifyToken, async function (req, res, next) {
  try {
    let board = await Board.findOne({ slug: req.params.boardSlug });
    if (!board) {
      return res.status(400).send(`Board not found.`);
    }
    if (board.isPublic || board.owner == req.user.userId) {
      return res.status(200).json({ board });
    }

    await Board.findById(board.id)
      .populate("teamId", "members")
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
  } catch (error) {}
});

module.exports = router;
