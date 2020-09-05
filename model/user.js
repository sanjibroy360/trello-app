let mongoose = require("mongoose");
let { hash, compare } = require("bcrypt");
let Team = require("./team");
let Board = require("./board");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 25,
      minlength: 8,
    },
    teamId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],

    boardId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],

    image: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.encryptPassword = async function (password) {
  try {
    password = await hash(password, 10);
    return password;
  } catch (error) {
    return null;
  }
};

userSchema.methods.profileInfo = function (user, token = null) {
  console.log(token, "token");
  let profile = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    image: user.image || null,
    bio: user.bio || "",
  };
  if (token) {
    profile.token = token;
  }

  return profile;
};

userSchema.methods.verifyPassword = async function (password) {
  console.log(password, this.password);
  return await compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
