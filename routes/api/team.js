let express = require("express");
let router = express.Router();
let auth = require("../../utils/auth");
let Team = require("../../model/team");
let User = require("../../model/user");
let Board = require("../../model/board");

router.post("/create", auth.verifyToken, async function (req, res, next) {
  try {
    let { name } = req.body.team;
    req.body.team.owner = req.user.userId;
    if (!name) {
      return res.status(400).send(`Team name is required.`);
    }
    let team = await Team.create(req.body.team);

    if (team) {
      let user = await User.findByIdAndUpdate(
        req.user.userId,
        { $addToSet: { teamId: team.id } },
        { new: true }
      );
      return res.status(200).json({ team });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:teamSlug/update", auth.verifyToken, async function (
  req,
  res,
  next
) {
  try {
    let { name, type } = req.body.team;
    // console.log({ slug: req.params.teamSlug });
    let team = await Team.findOne({ slug: req.params.teamSlug });
    if (!team) return res.status(400).send(`Team not found!`);

    if (team.owner == req.user.userId) {
      if (name && team.name != name) {
        req.body.team.slug = team.generateSlug(name);
      }
      team = await Team.findByIdAndUpdate(team.id, req.body.team, {
        new: true,
      });
      return res.status(200).json({ team });
    } else {
      return res.status(400).send(`Only owner can edit the team information.`);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/all", auth.verifyToken, async function (req, res, next) {
  try {
    let teams = await User.findById(req.user.userId)
      .populate("teamId", "-createdAt -updatedAt")
      .exec(function (error, user) {
        if (error) {
          return res.status(400).json({ error });
        }
        return res.status(200).json({ teams: user.teamId });
      });
  } catch (error) {
    next(error);
  }
});

router.post("/:slug/add-member/:username", auth.verifyToken, async function (
  req,
  res,
  next
) {
  try {
    let username = req.params.username;
    let slug = req.params.slug;
    let user = await User.findOne({ username });
    let team = await Team.findOne({ slug });
    if (team.owner == req.user.userId) {
      team = await Team.findByIdAndUpdate(
        team.id,
        { $addToSet: { members: user.id } },
        { new: true }
      );
      user = await User.findByIdAndUpdate(
        user.id,
        { $addToSet: { teamId: team.id } },
        { new: true }
      );
      return res.status(200).json({ team });
    } else {
      return res.status(400).send(`Only team creator can edit team.`);
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:slug/remove-member/:username",
  auth.verifyToken,
  async function (req, res, next) {
    try {
      let username = req.params.username;
      let slug = req.params.slug;
      let user = await User.findOne({ username });
      let team = await Team.findOne({ slug });
      if (team.owner == req.user.userId) {
        team = await Team.findByIdAndUpdate(
          team.id,
          { $pull: { members: user.id } },
          { new: true }
        );
        return res.status(200).json({ team });
      } else {
        return res.status(400).send(`Only team creator can edit team.`);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:slug/delete", auth.verifyToken, async function (
  req,
  res,
  next
) {
  try {
    let slug = req.params.slug;
    let team = await Team.findOne({ slug });

    if (team.owner == req.user.userId) {
      let boards = await Board.updateMany(
        { teamId: team.id },
        { teamId: null },
        { new: true }
      );
      team = await Team.findByIdAndDelete(team.id);
      return res.status(200).json({ message: `Team deleted successfuly!` });
    } else {
      return res.status(400).send(`Only team creator can delete team.`);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async function (req, res, next) {
  try {
    let team = await Team.findOne({ slug: req.params.slug })
      .populate("owner", "-id")
      .populate("members", "-id");
    if (!team) return res.status(404).send("Team not found!");
    return res.status(200).json({ team });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
