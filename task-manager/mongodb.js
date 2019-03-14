// Implement create, read, update, and delete functionalities

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the database!");
    }

    const db = client.db(databaseName);

    db.collection("tasks")
      .deleteOne({
        description: "Wash clothes"
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    // db.collection("tasks")
    //   .updateMany({ completed: true }, { $set: { completed: false } })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("5c8435f10171cead194c0c7e") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log("Unable to fetch data");
    //     }

    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     if (error) {
    //       return console.log("Unable to find tasks");
    //     }

    //     console.log(tasks);
    //   });

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Nik",
    //       age: 27
    //     },
    //     {
    //       name: "Jennifer",
    //       age: 25
    //     },
    //     {
    //       name: "Joseph",
    //       age: 28
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       console.log("Unable to insert records!");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Wash clothes",
    //       completed: false
    //     },
    //     {
    //       description: "Call Mariott for points",
    //       completed: false
    //     },
    //     {
    //       description: "Wash dishes",
    //       completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       console.log("Unable to insert records!");
    //     }

    //     console.log(result.ops);
    //   }
    // );
  }
);
