const mongoose = require("mongoose");
const { mongoURI } = require("../config/default");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
