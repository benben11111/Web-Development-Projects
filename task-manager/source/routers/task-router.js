const express = require("express");
const Task = require("../models/task");
const authenticate = require("../middleware/authentication");
const router = new express.Router();

router.post("/tasks", authenticate, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
  //   task
  //     .save()
  //     .then(() => {
  //       res.status(201).send(task);
  //     })
  //     .catch(e => {
  //       res.status(400).send(e);
  //     });
});

// GET /tasks?completed=true
// Give user control on what they can get back from the database
router.get("/tasks", authenticate, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    await req.user.populate("tasks").execPopulate();
    //const tasks = await Task.find({ owner: req.user._id, match });
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }

  //   Task.find({})
  //     .then(tasks => {
  //       res.send(tasks);
  //     })
  //     .catch(e => {
  //       res.status(500).send();
  //     });
});

router.get("/tasks/:id", authenticate, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    //const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }

  //   Task.findById(_id)
  //     .then(task => {
  //       if (!task) {
  //         return res.status(404).send();
  //       }

  //       res.send(task);
  //     })
  //     .catch(e => {
  //       res.status(500).send();
  //     });
});

router.patch("/tasks/:id", authenticate, async (req, res) => {
  const fieldsToBeUpdated = Object.keys(req.body);
  const fieldsAllowedToBeUpdated = ["description", "completed"];
  const isValidUpdate = fieldsToBeUpdated.every(fieldToBeUpdated => {
    return fieldsAllowedToBeUpdated.includes(fieldToBeUpdated);
  });

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const _id = req.params.id;

  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id
    });
    //const task = await Task.findById(_id);

    if (!task) {
      res.status(404).send();
    }

    fieldsToBeUpdated.forEach(
      fieldToBeUpdated => (task[fieldToBeUpdated] = req.body[fieldToBeUpdated])
    );
    await task.save();
    //   const task = await Task.findByIdAndUpdate(_id, req.body, {
    //     new: true,
    //     runValidators: true
    //   });

    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", authenticate, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    //const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
