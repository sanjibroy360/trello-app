let slug = require("slug");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require("./user");
let Team = require("./team");

let boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
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
  },
  { timestamps: true }
);

boardSchema.pre("save", async function (next) {
  if (this.name && this.isModified("name")) {
    this.slug = slug(this.name);
  }
});

module.exports = mongoose.model("Board", boardSchema);
