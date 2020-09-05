const User = require("../model/user");
const Team = require("../model/team");
const Board = require("../model/board");
const Card = require("../model/card");
const Comment = require("../model/comment");
const List = require("../model/list");

const auth = require("../middleware/auth");

exports.createTeam = async function (req, res, next) {
  try {
    let { name } = req.body.team;
    req.body.team.owner = req.user.userId;
    req.body.team.members = [req.user.userId];
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
};

exports.updateTeam = async function (req, res, next) {
  try {
    let { name, type } = req.body.team;

    let team = await Team.findOne({ slug: req.params.teamSlug });
    if (!team) return res.status(400).send(`Team not found!`);

    if (!req.user) {
      return res.status(401).send(`Only owner can edit the team information.`);
    }

    if (team.owner == req.user.userId) {
      if (name && team.name != name) {
        req.body.team.slug = team.generateSlug(name);
      }
      team = await Team.findByIdAndUpdate(team.id, req.body.team, {
        new: true,
      }).populate("owner");
      return res.status(200).json({ team });
    } else {
      return res.status(400).send(`Only owner can edit the team information.`);
    }
  } catch (error) {
    next(error);
  }
};

exports.singleUserTeams = async function (req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).send(`Unauthorized user, you need to login first`);
    }
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
};

exports.addTeamMember = async function (req, res, next) {
  try {
    let username = req.params.username;
    let slug = req.params.slug;
    let user = await User.findOne({ username });
    let team = await Team.findOne({ slug });

    if (!req.user) {
      return res.status(401).send(`Only owner can edit the team information.`);
    }

    if (team.owner == req.user.userId) {
      team = await Team.findByIdAndUpdate(
        team.id,
        { $addToSet: { members: user.id } },
        { new: true }
      ).populate("members");
      user = await User.findByIdAndUpdate(
        user.id,
        { $addToSet: { teamId: team.id } },
        { new: true }
      );
      return res.status(200).json({ team });
    } else {
      return res.status(400).send(`Only admin can add or remove menmbers.`);
    }
  } catch (error) {
    next(error);
  }
};

exports.removeMember = async function (req, res, next) {
  try {
    let username = req.params.username;
    let slug = req.params.slug;
    let user = await User.findOne({ username });
    let team = await Team.findOne({ slug });
    if (!req.user) {
      return res.status(401).send(`Only owner can edit the team information.`);
    }
    if (
      (team.owner == req.user.userId || user.id == req.user.userId) &&
      user.id !== team.owner
    ) {
      team = await Team.findByIdAndUpdate(
        team.id,
        { $pull: { members: user.id } },
        { new: true }
      ).populate("members");

      user = await User.findByIdAndUpdate(
        user.id,
        { $pull: { teamId: team.id } },
        { new: true }
      );
      return res.status(200).json({ team });
    } else {
      return res.status(400).send(`Only admin can add or remove menmbers.`);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteTeam = async function (req, res, next) {
  try {
    let slug = req.params.slug;
    let team = await Team.findOne({ slug });

    if (!req.user) {
      return res.status(401).send(`Only owner can edit the team information.`);
    }

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
};

exports.singleTeamInfo = async function (req, res, next) {
  try {
    let team = await Team.findOne({ slug: req.params.slug })
      .populate("owner members boardId")
      .exec(function (error, team) {
        if (error || !team) {
          return res.status(400).send(`Team not found.`);
        }
        if (team.isPublic) {
          return res.status(200).json({ team });
        }
        if (!req.user) {
          console.log({ user: req.user }, team.members[0]._id);
          return res.status(400).send(`Team not found.`);
        }

        let isMember = team.members.some(
          (member) => member._id == req.user.userId
        );

        console.log(isMember);

        if (isMember) {
          return res.status(200).json({ team });
        } else {
          return res.status(400).status(`Team not found.`);
        }
      });
  } catch (error) {
    next(error);
  }
};
