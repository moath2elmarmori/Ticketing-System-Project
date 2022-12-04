const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    ticketText: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      enum: ["Problem", "Appreciation", "Feedback"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Close"],
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
