// All the routes for the index of our application:
const express = require("express");

// Import the router function from express:
const router = express.Router();

router.get("/", (req, res) => {
  //   res.send("Hello world!");
  res.render("index");
});

// We need to export the router variable if we want to use it in the server.
module.exports = router;
