const User = require("../../models/userModel");
const Ticket = require("../../models/ticketModel");
const Product = require("../../models/productModel");
const Company = require("../../models/companyModel");
const { TicketType } = require("../graphqlTypes");
const { GraphQLString, GraphQLID } = require("graphql");
const jwt = require("jsonwebtoken");

const addTicketMuation = {
  type: TicketType,
  args: {
    ticketText: { type: GraphQLString },
    classification: { type: GraphQLString },
    status: { type: GraphQLString },
    product: { type: GraphQLID },
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
      const foundCompany = await Company.findById(decodedToken.companyId);
      const foundUser = await User.findById(decodedToken.id);
      const foundProduct = await Product.findById(args.product);
      const newTicket = new Ticket({
        ticketText: args.ticketText,
        classification: args.classification,
        status: args.status,
        product: args.product,
        user: decodedToken.id,
        company: decodedToken.companyId,
      });
      foundUser.tickets.push(newTicket._id);
      await foundUser.save();
      foundCompany.tickets.push(newTicket._id);
      await foundCompany.save();
      foundProduct.tickets.push(newTicket._id);
      await foundProduct.save();
      return await newTicket.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { addTicketMuation };
