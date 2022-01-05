const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL);
mongoose.connection
  .once("open", () => {
    console.log("Connected to mongodb");
  })
  .on("error", (error) => {
    console.log("Something went wrong " + error);
  });
