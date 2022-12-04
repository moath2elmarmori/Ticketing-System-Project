const { GraphQLString } = require("graphql");
const jwt = require("jsonwebtoken");
const Product = require("../../models/productModel");
const User = require("../../models/userModel");
const Company = require("../../models/companyModel");
const { ProudctType } = require("../graphqlTypes");

const addProductMutation = {
  type: ProudctType,
  args: {
    name: { type: GraphQLString },
    category: { type: GraphQLString },
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
      const newProduct = new Product({
        name: args.name,
        category: args.category,
        company: decodedToken.companyId,
        createdBy: decodedToken.id,
      });
      foundUser.products.push(newProduct._id);
      await foundUser.save();
      foundCompany.products.push(newProduct._id);
      await foundCompany.save();
      return await newProduct.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  addProductMutation,
};
