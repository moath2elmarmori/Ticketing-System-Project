const { GraphQLList, GraphQLID } = require("graphql");
const Ticket = require("../../models/ticketModel");
const { TicketType } = require("../graphqlTypes");
const Product = require("../../models/productModel");

const getTicketsByCompanyIdQuery = {
  type: new GraphQLList(TicketType),
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    const allTickets = await Ticket.find({ company: args.id });
    return allTickets;
  },
};

const getTicketsByProductIdQuery = {
  type: new GraphQLList(TicketType),
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    // find the product and populte the tickets field
    const foundProduct = await Product.findById(args.id).populate("tickets");
    // save the tickets array in a constant
    const allTickets = foundProduct.tickets;
    return allTickets;
  },
};

const getTicketsByUserIdQuery = {
  type: new GraphQLList(TicketType),
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Ticket.find({ user: args.id });
  },
};

const getTicketByIdQuery = {
  type: TicketType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    const foundTicket = await Ticket.findById(args.id).populate({
      path: "replies",
      select: "replyText createdAt",
      populate: {
        path: "user",
        select: "username",
      },
    });
    return foundTicket;
  },
};

module.exports = {
  getTicketsByCompanyIdQuery,
  getTicketsByProductIdQuery,
  getTicketByIdQuery,
  getTicketsByUserIdQuery,
};
