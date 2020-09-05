let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = require("./user");
let Team = require("./team");
let Board = require("./board");
let Card = require("./card");

let listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },

    memberId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

listSchema.pre("save", async function (next) {
  if (this.name && this.isModified("name")) {
    let listName = this.name;
    let arr = listName.split(" ");
    if (arr.length == 1) {
      listName = arr[0].slice(0, 7);
    } else if (arr.length > 1) {
      listName = arr[0];
    }

    let slug =
      listName +
      Date.now().toString().slice(-2) +
      Math.floor(Math.random() * (29 - 11) + 11);
    console.log({ slug });
    return (this.slug = slug);
  }
});

listSchema.methods.generateSlug = function (listName) {
  let arr = listName.split(" ");
  if (arr.length == 1) {
    listName = arr[0].slice(0, 7);
  } else if (arr.length > 1) {
    listName = arr[0];
  }

  let slug =
    listName +
    Date.now().toString().slice(-2) +
    Math.floor(Math.random() * (29 - 11) + 11);
  console.log({ slug });
  return slug;
};

module.exports = mongoose.model("List", listSchema);
