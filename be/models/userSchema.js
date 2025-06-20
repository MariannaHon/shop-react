const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: 50,
      trim: true,
    },

    lastName: {
      type: String,
      require: true,
      maxlength: 50,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      maxlength: 50,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    active: {
      type: Boolean,
      default: true,
    },

    // child reference (one to many)
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        firstName: String,
        lastName: String,
        company: String,
        address: String,
        country: String,
        city: String,
        state: String,
        zipCode: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

// Hash Password Before Send to Database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
