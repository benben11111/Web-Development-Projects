require("../source/database/mongoose");
const Task = require("../source/models/task");

// Task.findByIdAndDelete("5c85c13fc49285c94ccb44c7")
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5c858f52eeb200c43e9bc3ce")
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
