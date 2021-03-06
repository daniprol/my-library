if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// Import the body parser so we can get the form fields when adding a new author:
const bodyParser = require("body-parser");

// Import the index router file:
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

app.set("view engine", "ejs");

// We need to specify from which directory our views will be coming from:
app.set("views", __dirname + "/views");

// Specify which layout file we are going to use:
app.set("layout", "layouts/layout");

app.use(expressLayouts);

// Stylesheets, JS, images...
app.use(express.static("public"));

// This limit of 10mb for the body content of the request will be useful when we start to upload files.
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
// You may not need to pass the useNewUrlParser option since it defaults to true now.
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// What does this do?
const db = mongoose.connection;
// console.log(db);
// Let's see if it connects correctly!
db.on("error", (error) => console.log(error));
// The function .once only runs 1 time: it will run when the connection to the db opens.
db.once("open", () => console.log("Connected to Mongoose"));

// After we import the indexRouter file, we can tell the router to use that:
// Note that the function is .use() and not a get request
app.use("/", indexRouter);
// We want to use our authorRouter but not on the root route:
app.use("/authors", authorRouter);

// When we deploy the server is going to tell us from which port we are listening to
app.listen(process.env.PORT || 3000);
