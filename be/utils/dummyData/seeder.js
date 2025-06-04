require("../../config/database"); // Connect to Database
require("colors");

// load schemas
const Product = require("../../models/productSchema");
const Category = require("../../models/categorySchema");
const Subcategory = require("../../models/subcategorySchema");
const Brand = require("../../models/brandsSchema");
const User = require("../../models/userSchema");

// load files
const categories = require("./categories.json");
const subcategories = require("./subcategories.json");
const brands = require("./brands.json");
const products = require("./products.json");
const users = require("./users.json");

const insertData = async () => {
  try {
    await Brand.create(brands);
    await Category.create(categories);
    await Subcategory.create(subcategories);
    await Product.create(products);
    await User.create(users);

    console.log(`Inserted ${brands.length} brands.`);
    console.log(`Inserted ${categories.length} categories.`);
    console.log(`Inserted ${subcategories.length} subcategories.`);
    console.log(`Inserted ${products.length} products.`);
    console.log(`Inserted ${users.length} users.`);
    console.log("Database is ready.".green.inverse);
  } catch (error) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed.".red.inverse);

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

exports.insertData = insertData;
exports.destroyData = destroyData;
