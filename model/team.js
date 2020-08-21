let slug = require("slug");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require("./user");
let Board = require("./board");

let teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: String,
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
    this.slug = slug(this.name);
  }
});

teamSchema.methods.generateSlug = function (name) {
  return slug(name);
};

module.exports = mongoose.model("Team", teamSchema);
