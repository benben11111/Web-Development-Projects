const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("./database/mongoose");
const User = require("./models/user");
const Blog = require("./models/blog");
const Comment = require("./models/comment");

const app = express();

// Create view engine of ejs
app.set("view engine", "ejs");

// Use static files for styling
app.use(express.static("public"));

// Set up body parser to get front-end data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up method override
app.use(methodOverride("_method"));

// Set up passport to authenticate user
app.use(
  expressSession({
    secret: "thisisasecretfortheblogapp",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Notify other routes if there is a current user
app.use((req, res, next) => {
  res.locals.activeUser = req.user;
  next();
});

// Create the server for the project
const port = 3000;

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is up on port ${port}.`);
});

// middleware for verification
const verifyLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

// Go to the home page
app.get("/", (req, res) => {
  res.render("home");
});

// Go to the blog page
app.get("/allBlogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.render("blogs", { blogs });
  });
});

// Go to the blog page
app.get("/blogs", verifyLogin, (req, res) => {
  User.findOne({ username: req.user.username })
    .populate("blogs")
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      //console.log(req.user.blogs);
      res.render("blogs", { blogs: user.blogs });
    });
  //         , (err, blogs) => {
  //     if (err) {
  //       console.log(err);
  //       res.send(err);
  //     }
  //     res.render("blogs", { blogs });
  //   });
});

// Go to the login page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

// log out
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Go to the sign up page
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, newlyCreatedUser) => {
    //console.log(newUser);
    if (err) {
      console.log(err);
      res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () => {
      //console.log(req.body);
      res.redirect("/");
    });
  });
});

// Go to the contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Go to add new blog page to write a new blog
app.get("/addNewBlog", verifyLogin, (req, res) => {
  res.render("addNewBlog");
});

app.post("/addNewBlog", verifyLogin, (req, res) => {
  const title = req.body.blog.blogTitle;
  const content = req.body.blog.blogContent;

  const newBlog = {
    title,
    content,
    owner: req.user._id
  };

  //console.log(newBlog.owner);
  Blog.create(newBlog)
    .then(newlyCreatedBlog => {
      User.findOne({ username: req.user.username }, (err, blogCreator) => {
        if (err) {
          console.log(err);
        }
        blogCreator.blogs.push(newlyCreatedBlog);
        blogCreator.save();
      });
      //res.status(201).json(newlyCreatedBlog);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

// Click into a specific blog
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .populate("comments")
    .exec((err, targetBlog) => {
      if (err) {
        //console.log(err);
        res.send(err);
      } else {
        res.render("blog", { targetBlog });
      }
    });

  //     .then(targetBlog => {
  //       targetBlog.populate("comments").execPopulate();
  //       res.render("blog", { targetBlog });

  //       //console.log(targetBlog);
  //     })
  //     .catch(e => {
  //       if (e) {
  //         res.status(404).send(e);
  //       }
  //     });
});

// Delete a blog
app.delete("/blogs/:id", verifyLogin, (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.status(404).send(err);
      res.redirect("/");
    }
    res.redirect("/");
  });
});

// Edit a blog
app.get("/blogs/:id/edit", verifyLogin, (req, res) => {
  Blog.findById(req.params.id, (err, targetBlog) => {
    if (err) {
      throw new Error();
    }
    res.render("editBlog", { targetBlog });
  });
});

// Update the blog
app.put("/blogs/:id", verifyLogin, (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, (err, blog) => {
    if (err) {
      throw new Error();
    }
  });
});

// Get to a comment page to add a comment to a specific blog
app.get("/blogs/:id/comments/addNewComment", (req, res) => {
  Blog.findById(req.params.id, (err, targetBlog) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.render("addNewComment", { targetBlog });
  });
});

app.post("/blogs/:id/comments", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      //console.log(req.body.comment);
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          blog.comments.push(comment);
          blog.save();
          res.redirect(`/blogs/${blog._id}`);
        }
      });
    }
  });
});
