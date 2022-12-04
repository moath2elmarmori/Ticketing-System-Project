const { GraphQLList, GraphQLID } = require("graphql");

const Company = require("../../models/companyModel");
const { CompanyType } = require("../graphqlTypes");

const getAllCompaniesQuery = {
  type: new GraphQLList(CompanyType),
  resolve(parent, args) {
    return Company.find({});
  },
};

const getCompanyByIdQuery = {
  type: CompanyType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    const company = await Company.findById(args.id);
    return company;
  },
};

module.exports = {
  getAllCompaniesQuery,
  getCompanyByIdQuery,
};
