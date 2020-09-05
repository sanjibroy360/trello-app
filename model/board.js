let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require("./user");
let Team = require("./team");
let List = require("./list");

let boardSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true }
);

boardSchema.pre("save", async function (next) {
  if (this.name && this.isModified("name")) {
    let boardName = this.name;
    let arr = boardName.split(" ");
    if (arr.length == 1) {
      boardName = arr[0].slice(0, 7);
    } else if (arr.length > 1) {
      boardName = arr[0];
    }

    let boardSlug =
      boardName +
      Date.now().toString().slice(-2) +
      Math.floor(Math.random() * (29 - 11) + 11);
    console.log({ boardSlug });
    return (this.slug = boardSlug);
  }
});

boardSchema.methods.generateSlug = function (boardName) {
  let arr = boardName.split(" ");
  if (arr.length == 1) {
    boardName = arr[0].slice(0, 7);
  } else if (arr.length > 1) {
    boardName = arr[0];
  }

  let boardSlug =
    boardName +
    Date.now().toString().slice(-2) +
    Math.floor(Math.random() * (29 - 11) + 11);

  return boardSlug;
};

module.exports = mongoose.model("Board", boardSchema);
