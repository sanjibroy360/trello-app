let express = require("express");
let router = express.Router();
let auth = require("../../../middleware/auth");
let Team = require("../../../model/team");
let User = require("../../../model/user");
let Board = require("../../../model/board");

let teamController = require("../../../controllers/teamController");

router.post("/create", auth.verifyToken, teamController.createTeam);

router.post("/:teamSlug/update", auth.verifyToken, teamController.updateTeam);

router.get("/all", auth.verifyToken, teamController.singleUserTeams);

router.post(
  "/:slug/add-member/:username",
  auth.verifyToken,
  teamController.addTeamMember
);

router.delete(
  "/:slug/remove-member/:username",
  auth.verifyToken,
  teamController.removeMember
);

router.delete("/:slug/delete", auth.verifyToken, teamController.deleteTeam);

router.get("/:slug", auth.verifyToken, teamController.singleTeamInfo);

module.exports = router;
