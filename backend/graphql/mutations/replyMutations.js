const { GraphQLString, GraphQLID } = require("graphql");
const jwt = require("jsonwebtoken");
const { ReplyType } = require("../graphqlTypes");
const Ticket = require("../../models/ticketModel");
const Reply = require("../../models/replyModel");
const User = require("../../models/userModel");

const addReplyMutation = {
  type: ReplyType,
  args: {
    replyText: { type: GraphQLString },
    ticketId: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    let token;
    const bearerToken = context.requestObject.headers.authorization;
    if (bearerToken && bearerToken.startsWith("Bearer")) {
      token = bearerToken.split(" ")[1];
    } else {
      throw new Error("Not Authrorized");
    }
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const newReply = new Reply({
        replyText: args.replyText,
        ticket: args.ticketId,
        user: decodedToken.id,
      });
      const foundTicket = await Ticket.findById(args.ticketId);
      foundTicket.replies.push(newReply._id);
      await foundTicket.save();
      await newReply.save();
      return newReply;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  addReplyMutation,
};
