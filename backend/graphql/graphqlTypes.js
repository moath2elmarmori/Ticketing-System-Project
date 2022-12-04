const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
} = require("graphql");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    companyName: { type: GraphQLString },
    companyId: { type: GraphQLID },
    companyPasscode: { type: GraphQLString },
    token: { type: GraphQLString },
    role: { type: GraphQLString },
    extension: { type: GraphQLFloat },
    products: { type: GraphQLList(ProudctType) },
    tickets: { type: GraphQLList(TicketType) },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "ComapnyType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    passcode: { type: GraphQLString },
    extensions: { type: GraphQLList(GraphQLFloat) },
    users: { type: GraphQLList(UserType) },
    products: { type: GraphQLList(ProudctType) },
    tickets: { type: GraphQLList(TicketType) },
  }),
});

const ProudctType = new GraphQLObjectType({
  name: "ProudctType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    tickets: {
      type: GraphQLList(TicketType),
    },
    createdBy: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.createdBy);
      },
    },
  }),
});

const TicketType = new GraphQLObjectType({
  name: "TicketType",
  fields: () => ({
    _id: { type: GraphQLID },
    ticketText: { type: GraphQLString },
    product: { type: GraphQLID },
    classification: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLFloat },
    replies: { type: GraphQLList(ReplyType) },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user);
      },
    },
  }),
});

const ReplyType = new GraphQLObjectType({
  name: "ReplyType",
  fields: () => ({
    _id: { type: GraphQLID },
    replyText: { type: GraphQLString },
    createdAt: { type: GraphQLFloat },
    ticket: {
      type: TicketType,
      resolve(parent, args) {
        return Ticket.findById(parent.ticket);
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user);
      },
    },
  }),
});

module.exports = {
  UserType,
  CompanyType,
  ProudctType,
  TicketType,
  ReplyType,
};
