const mongoose = require("mongoose");

// Define the Book schema
const bookSchema = new mongoose.Schema({
  code: String,
  title: String,
  originalPrice: Number,
  discount: Number,
  stock: Number,
  imageUri: String,
  sold: Number,
  supplier: String,
  publisher: String,
  listAuthor: [String],
  listCategory: [String],
  coverType: String,
  numberPage: Number,
  description: String,
});

// Create and export the Book model
module.exports = mongoose.model("Book", bookSchema);
