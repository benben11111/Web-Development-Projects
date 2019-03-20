const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     //required: true,
  //     trim: true
  //   },
  username: {
    type: String,
    //required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    //required: true,
    trim: true,
    minlength: 8
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
