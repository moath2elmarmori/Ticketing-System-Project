const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  extensions: [Number],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

module.exports = mongoose.model("Company", companySchema);
