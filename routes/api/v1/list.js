let express = require("express");
let router = express.Router();
let Team = require("../../../model/team");
let User = require("../../../model/user");
let Board = require("../../../model/board");
let List = require("../../../model/list");
let auth = require("../../utils/auth");

// router.post("/:boardId/list/create", auth.verifyToken, async function (req, res, next) {
//   try {
//     let { name } = req.body.list;
//     let boardId = req.params.boardId;
//     if (!name) {
//       return res.status(400).send(`List name is required.`);
//     }
//     console.log({userId: req.user.userId, boardId:req.params});
//     req.body.owner = req.user.userId;
//     let list = await List.create(req.body.team);
//     let board = await Board.findByIdAndUpdate(boardId, {
//       $addToSet: { lists: list.id },
//     });
//     return res.status(200).json({ list });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:boardId/list/all", auth.verifyToken, async function (req, res, next) {
//   try {
//     let boardId = req.params.boardId;
//     let lists = await List.find({ boardId });
//     return res.status(200).json({ lists });
//   } catch (error) {}
// });

// router.delete("/:boardId/list/:listId/delete", auth.verifyToken, async function (
//   req,
//   res,
//   next
// ) {
//   let listId = req.params.listId;
//   let boardId = req.params.boardId;
//   let list = await List.findByIdAndDelete(listId);
//   if (!list) {
//     return res.status(400).send(`List not found.`);
//   }
//   let Board = await Board.findByIdAndUpdate(boardId, {
//     $pull: { lists: listId },
//   });
//   return res.status(200).send(`List deleted successfuly.`);
// });

module.exports = router;
