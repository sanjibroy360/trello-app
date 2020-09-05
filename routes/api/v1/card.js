let express = require("express");
let router = express.Router();

let User = require("../../../model/user");
let Team = require("../../../model/team");
let List = require("../../../model/list");
let Board = require("../../../model/board");
let Card = require("../../../model/card");
let Comment = require("../../../model/comment");


let auth = require("../../../middleware/auth");
const cardController = require("../../../controllers/cardController");
const commentController = require("../../../controllers/commentController");

router.post("/:listSlug/card/add", auth.verifyToken, cardController.addCard);

router.put(
  "/:listSlug/card/:cardSlug/edit",
  auth.verifyToken,
  cardController.editCard
);

router.delete(
  "/:listSlug/card/:cardSlug/delete",
  auth.verifyToken,
  cardController.deleteCard
);

router.get(
  `/:listSlug/card/:cardSlug`,
  auth.verifyToken,
  cardController.singleCardInfo
);

//******************** Comments ********************

router.post(
  `/:listSlug/card/:cardSlug/comment/create`,
  auth.verifyToken,
  commentController.addComment
);

router.put(
  `/:listSlug/card/:cardSlug/comment/:commentId/edit`,
  auth.verifyToken,
  commentController.editComment
);

router.delete(
  `/:listSlug/card/:cardSlug/comment/:commentId/delete`,
  auth.verifyToken,
  commentController.deleteComment
);

router.get(
  `/:listSlug/card/:cardSlug/comments/all`,
  auth.verifyToken,
  commentController.singleCardComment
);


module.exports = router;
