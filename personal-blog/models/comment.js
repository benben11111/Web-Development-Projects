const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  owner: {
    type: String
  },
  content: {
    type: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
