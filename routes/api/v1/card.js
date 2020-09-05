let express = require("express");
let router = express.Router();

let User = require("../../../model/user");
let Team = require("../../../model/team");
let List = require("../../../model/list");
let Board = require("../../../model/board");
let Card = require("../../../model/card");


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


module.exports = router;
