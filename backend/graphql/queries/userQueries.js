const { GraphQLList, GraphQLID } = require("graphql");

const User = require("../../models/userModel");
const { UserType } = require("../graphqlTypes");

const getAllUsersQuery = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    return User.find({});
  },
};

const getAllUsersByCompanyIdQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {type: GraphQLID},
  },
  resolve(parent, args) {
    return User.find({companyId: args.id})
  }
}

const getUserByIdQuery = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return User.findById(args.id);
  },
};

module.exports = {
  getAllUsersQuery,
  getAllUsersByCompanyIdQuery,
  getUserByIdQuery,
};
