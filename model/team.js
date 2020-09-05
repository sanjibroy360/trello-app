let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require("./user");
let Board = require("./board");

let teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    boardId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
        default: null,
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

teamSchema.pre("save", async function (next) {
  if (this.name && this.isModified("name")) {
    let teamName = this.name;
    let arr = teamName.split(" ");
    if (arr.length == 1) {
      teamName = arr[0].slice(0, 7);
    } else if (arr.length > 1) {
      teamName = arr[0];
    }

    let slug =
      teamName +
      Date.now().toString().slice(-2) +
      Math.floor(Math.random() * (29 - 11) + 11);
    console.log({ slug });
    return (this.slug = slug);
  }
});

teamSchema.methods.generateSlug = function (teamName) {
  let arr = teamName.split(" ");
  if (arr.length == 1) {
    teamName = arr[0].slice(0, 7);
  } else if (arr.length > 1) {
    teamName = arr[0];
  }

  let slug =
    teamName +
    Date.now().toString().slice(-2) +
    Math.floor(Math.random() * (29 - 11) + 11);
  console.log({ slug });
  return slug;
};

module.exports = mongoose.model("Team", teamSchema);
