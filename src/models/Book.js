const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  author: { type: String, required: true, index: true },
  title: { type: String, unique: true, index: true },
  image_url: String,
  quotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quote" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
