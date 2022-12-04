const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    requierd: true,
  },
  category: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
