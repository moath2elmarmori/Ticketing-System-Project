const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    replyText: {
      type: String,
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reply", replySchema);
