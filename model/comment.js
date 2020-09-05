let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require("./user");
let Team = require("./team");
let Board = require("./board");
let List = require("./list");

let commentSchema = new Schema(
  {
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
