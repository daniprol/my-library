const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// We are going to export it as a new mongoose model:
module.exports = mongoose.model("Author", authorSchema);
// Author will be pretty much the name of our table inside of our database.
