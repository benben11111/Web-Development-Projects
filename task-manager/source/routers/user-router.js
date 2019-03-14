const express = require("express");
const User = require("../models/user");
const authenticate = require("../middleware/authentication");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
  //   user
  //     .save()
  //     .then(() => {
  //       res.status(201).send(user);
  //     })
  //     .catch(e => {
  //       res.status(400).send(e);
  //     });
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", authenticate, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", authenticate, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/myProfile", authenticate, async (req, res) => {
  res.send(req.user);

  //   try {
  //     const users = await User.find({});
  //     res.send(users);
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }

  //   User.find({})
  //     .then(users => {
  //       res.send(users);
  //     })
  //     .catch(e => {
  //       res.status(500).send();
  //     });
});

// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }

//   User.findById(_id)
//     .then(user => {
//       if (!user) {
//         return res.status(404).send();
//       }

//       res.send(user);
//     })
//     .catch(e => {
//       res.status(500).send();
//     });
// });

router.patch("/users/myProfile", authenticate, async (req, res) => {
  const fieldsToBeUpdated = Object.keys(req.body);
  const fieldsAllowedToBeUpdated = ["name", "age", "email", "password"];
  const isValidUpdate = fieldsToBeUpdated.every(fieldToBeUpdated => {
    return fieldsAllowedToBeUpdated.includes(fieldToBeUpdated);
  });

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const _id = req.user._id;
  try {
    //const user = await User.findById(_id);

    fieldsToBeUpdated.forEach(
      fieldToBeUpdated =>
        (req.user[fieldToBeUpdated] = req.body[fieldToBeUpdated])
    );

    await req.user.save();

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    // if (!user) {
    //   res.status(404).send();
    // }
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/myProfile", authenticate, async (req, res) => {
  //const _id = req.user._id;
  try {
    await req.user.remove();
    // const user = await User.findByIdAndDelete(_id);

    // if (!user) {
    //   res.status(404).send();
    // }

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
