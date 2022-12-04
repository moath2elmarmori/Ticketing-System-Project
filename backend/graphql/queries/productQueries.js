const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const Product = require("../../models/productModel");
const { ProudctType } = require("../graphqlTypes");

const getAllProductsByCompanyIdQuery = {
  type: new GraphQLList(ProudctType),
  args: {
    id: { type: GraphQLID },
    limit: { type: GraphQLInt },
    skip: { type: GraphQLInt },
  },
  resolve(parent, args) {
    return Product.find({ company: args.id }).limit(args.limit).skip(args.skip);
  },
};

const getProductsByUserIdQuery = {
  type: new GraphQLList(ProudctType),
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Product.find({ createdBy: args.id });
  },
};

const getProductByIdQuery = {
  type: ProudctType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Product.findById(args.id);
  },
};

const getProductsByProductNameQuery = {
  type: new GraphQLList(ProudctType),
  args: {
    name: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const theRegEx = new RegExp(`${args.name}`);
    const products = await Product.find({
      name: { $regex: theRegEx, $options: "ig" },
    });
    return products;
  },
};

const productsPaginateQuery = {
  type: new GraphQLList(ProudctType),
  args: {
    skip: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const products = await Product.find({}).limit(args.limit).skip(args.skip);
    return products;
  },
};

module.exports = {
  getAllProductsByCompanyIdQuery,
  getProductByIdQuery,
  getProductsByProductNameQuery,
  getProductsByUserIdQuery,
  productsPaginateQuery,
};
