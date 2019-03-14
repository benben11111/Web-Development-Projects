require("../source/database/mongoose");
const User = require("../source/models/user");

// User.findByIdAndUpdate("5c84610d6890b9b40bb93e5b", { age: 21 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 0 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5c84610d6890b9b40bb93e5b", 3)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
