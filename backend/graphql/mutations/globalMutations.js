const { GraphQLString } = require("graphql");
const User = require("../../models/userModel");
const Company = require("../../models/companyModel");
const Product = require("../../models/productModel");
const Ticket = require("../../models/ticketModel");

const deleteAllMutation = {
  type: GraphQLString,
  async resolve(parent, args) {
    await Company.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await Ticket.deleteMany({});
    return "Deleted All";
  },
};

module.exports = {
  deleteAllMutation,
};
