const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/personal-blog", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
