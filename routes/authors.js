// All the routes for the index of our application:
const express = require("express");

// Import the mongoose.model Author:
const Author = require("../models/author");

// Import the router function from express:
const router = express.Router();

// All Authors route:
router.get("/", async (req, res) => {
  //   res.send("Hello world!");
  let searchOptions = {};
  // req.body contains the input form data.
  // req.query contains the '?name=daniel' of the route
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // 'i' : capital insensitive
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

// New author route:
router.get("/new", (req, res) => {
  // After we have defined the authorSchema we can pass it to render the file:
  res.render("authors/new", { author: new Author() });
});

//Creating the author
router.post("/", async (req, res) => {
  // This is what happens when we create a new author and press the button.
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }

  //   author.save((error, newAuthor) => {
  //     if (error) {
  //       res.render("authors/new", {
  //         author: author,
  //         errorMessage: "Error creating author",
  //       });
  //       // We pass the author so the input field remains populated in case there was an error and we need to repeat the form submit.
  //     } else {
  //       // res.redirect(`authors/${newAuthor.id}`)
  //       res.redirect("authors");
  //     }
  //   });

  // The form fields should come in the 'body' part of the request, but express doesn't have a way to handle it
  // So we use 'body-parser'
  //   res.send(req.body.name);
  //   res.send("Create");
});

// We need to export the router variable if we want to use it in the server.
module.exports = router;
