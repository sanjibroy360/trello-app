const express = require("express");
const router = express.Router();
const User = require("../../../model/user");
const Team = require("../../../model/team");
let List = require("../../../model/list");
const Board = require("../../../model/board");
const Card = require("../../../model/card");
const auth = require("../../../middleware/auth");

const boardController = require("../../../controllers/boardController");
const listController = require("../../../controllers/listController");

router.post("/create", auth.verifyToken, boardController.createBoard);

router.post(
  "/:boardSlug/add-team/:teamSlug",
  auth.verifyToken,
  boardController.addTeam
);

router.get("/team-boards", auth.verifyToken, boardController.allTeamBoards);

router.get(
  "/personal-boards",
  auth.verifyToken,
  boardController.allPersonalBoards
);

router.put("/:boardSlug/update", auth.verifyToken, boardController.updateBoard);

router.get("/:boardSlug", auth.verifyToken, boardController.singleBoardInfo);

router.delete(
  "/:boardSlug/delete",
  auth.verifyToken,
  boardController.deleteBoard
);

// ***************** List *****************

router.post(
  "/:boardSlug/list/create",
  auth.verifyToken,
  listController.createList
);

router.get(
  "/:boardSlug/list/all",
  auth.verifyToken,
  listController.singleBoardLists
);

router.delete(
  `/:boardSlug/list/:listSlug/cards/delete`,
  auth.verifyToken,
  listController.deleteAllCardsOfTheList
);

router.delete(
  "/:boardSlug/list/:listSlug/delete",
  auth.verifyToken,
  listController.deleteList
);

router.put(
  `/:boardSlug/list/:listSlug/update`,
  auth.verifyToken,
  listController.updateList
);

router.put(
  `/:boardSlug/list/reorder`,
  auth.verifyToken,
  listController.reorderCards
);

router.put(
  `/:boardSlug/list/reorder-between-two-list/card/:cardSlug`,
  auth.verifyToken,
  listController.reorderCardsBetweenTwoList
);

module.exports = router;
