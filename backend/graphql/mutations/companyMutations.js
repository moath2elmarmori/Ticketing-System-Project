const bcryptjs = require("bcryptjs");
const { GraphQLString } = require("graphql");

const Company = require("../../models/companyModel");
const { CompanyType } = require("../graphqlTypes");

const registerCompanyMutation = {
  type: CompanyType,
  args: {
    name: { type: GraphQLString },
    passcode: { type: GraphQLString },
  },
  async resolve(parent, args) {
    // check if company already exists
    const companyExists = await Company.findOne({ name: args.name });
    if (companyExists) {
      throw new Error("Company Already Exists");
    }
    // hash the passcode of the company
    const salt = await bcryptjs.genSalt(10);
    const hashPasscode = await bcryptjs.hash(args.passcode, salt);

    // create company instance
    const company = new Company({
      name: args.name,
      passcode: hashPasscode,
    });
    return await company.save();
  },
};

module.exports = {
  registerCompanyMutation,
};
