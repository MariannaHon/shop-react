const mongoose = require("mongoose");
require("dotenv").config();
// Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    // A and B => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// Create model
const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;
