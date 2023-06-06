const { Schema, model } = require("mongoose"); //require in schema and model from mongoose package

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/], //matches the regex for a valid email address
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Type.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema //virtual property for number of friends
  .virtual("numberOfFriends")
  .get(function () {
    return this.friends.length; //returns the number of friends for the user
  });

const User = model("User", userSchema);

module.exports = User;
