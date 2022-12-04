const bcryptjs = require("bcryptjs");
const { GraphQLString, GraphQLFloat, GraphQLEnumType } = require("graphql");

const User = require("../../models/userModel");
const Company = require("../../models/companyModel");
const { generateJsonWebToken } = require("../../utils/generateJsonWebToken");
const { UserType } = require("../graphqlTypes");

// Register User
const registerUserMutation = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    extension: { type: GraphQLFloat },
    companyName: { type: GraphQLString },
    companyPasscode: { type: GraphQLString },
    role: {
      type: new GraphQLEnumType({
        name: "UserRoleRegister",
        values: {
          agent: { value: "Agent" },
          backOffice: { value: "Back Office" },
          networkDepartment: { value: "Network Department" },
        },
      }),
      defaultValue: "Agent",
    },
  },
  async resolve(parent, args) {
    // check if the user's email is registered before already
    const userExist = await User.findOne({ email: args.email });
    if (userExist) {
      throw new Error("User Already Exist With This Email");
    }

    // find the company that the user want to register in
    const company = await Company.findOne({ name: args.companyName });

    // check if the extension that the user registered is used by another user or not
    company.extensions.forEach((extension) => {
      if (extension === args.extension) {
        throw new Error("This Extension Is Being Used By Another User");
      }
    });

    // check if the company passcode the user put === to the real company passcode
    const isCompanyPasscodeTrue = await bcryptjs.compare(
      args.companyPasscode,
      company.passcode
    );

    if (!isCompanyPasscodeTrue) {
      throw new Error("Company Passcode Is Wrong");
    }
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(args.password, salt);

    // create User instance
    const user = new User({
      username: args.username,
      email: args.email,
      password: hashPassword,
      extension: args.extension,
      companyName: args.companyName,
      companyPasscode: company.passcode,
      companyId: company._id,
      role: args.role,
    });

    // generate jwt token with the id of the user as a payload
    const token = generateJsonWebToken(user._id, user.companyId, user.role);
    // inserting the json web token in the user instance
    user.token = token;

    // push the extension to the extensions array of the company
    company.extensions.push(user.extension);
    // push the user to the users array of the company
    company.users.push(user._id);
    await user.save();
    await company.save();
    return user;
  },
};

const loginUserMutation = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { email, password } = args;
    const foundUser = await User.findOne({ email });
    const passwordIsTrue = await bcryptjs.compare(password, foundUser.password);
    // if there was a problem with signing the user in throw an error
    if (!foundUser || !passwordIsTrue) {
      throw new Error("Email Or Password Is Incorrect");
    }
    // if the credentials are valid then update the json web token
    foundUser.token = generateJsonWebToken(
      foundUser._id,
      foundUser.companyId,
      foundUser.role
    );
    return await foundUser.save();
  },
};

module.exports = {
  registerUserMutation,
  loginUserMutation,
};
