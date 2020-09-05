let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require("./user");
let Team = require("./team");
let Board = require("./board");
let List = require("./list");


let cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },

    memberId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },

    isDone: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
    },

    dueDate: {
      type: String,
    },

    slug: {
      type: String,
      unique: true,
    },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    labelColors: [{ type: String }],
  },
  { timestamps: true }
);

cardSchema.pre("save", async function (next) {
  if (this.name && this.isModified("name")) {
    let cardName = this.name;
    let arr = cardName.split(" ");
    if (arr.length == 1) {
      cardName = arr[0].slice(0, 7);
    } else if (arr.length > 1) {
      cardName = arr[0];
    }

    let slug =
      cardName +
      Date.now().toString().slice(-2) +
      Math.floor(Math.random() * (29 - 11) + 11);

    return (this.slug = slug);
  }
});

cardSchema.methods.generateSlug = function (cardName) {
  let arr = cardName.split(" ");
  if (arr.length == 1) {
    cardName = arr[0].slice(0, 7);
  } else if (arr.length > 1) {
    cardName = arr[0];
  }

  let slug =
    cardName +
    Date.now().toString().slice(-2) +
    Math.floor(Math.random() * (29 - 11) + 11);

  return slug;
};

module.exports = mongoose.model("Card", cardSchema);
