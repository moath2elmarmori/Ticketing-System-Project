const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {
  getAllUsersQuery,
  getUserByIdQuery,
  getAllUsersByCompanyIdQuery,
} = require("./queries/userQueries");
const {
  getAllCompaniesQuery,
  getCompanyByIdQuery,
} = require("./queries/companyQueries");
const {
  registerUserMutation,
  loginUserMutation,
} = require("./mutations/userMutations");
const { registerCompanyMutation } = require("./mutations/companyMutations");
const { addProductMutation } = require("./mutations/productMutations");
const { addTicketMuation } = require("./mutations/ticketMutations");
const { deleteAllMutation } = require("./mutations/globalMutations");
const {
  getAllProductsByCompanyIdQuery,
  getProductByIdQuery,
  getProductsByProductNameQuery,
  getProductsByUserIdQuery,
  productsPaginateQuery,
} = require("./queries/productQueries");
const {
  getTicketsByProductIdQuery,
  getTicketByIdQuery,
  getTicketsByCompanyIdQuery,
  getTicketsByUserIdQuery,
} = require("./queries/ticketQueries");
const { addReplyMutation } = require("./mutations/replyMutations");

// In The CRUD Operation, This is the "R" => Read (Getting Data)
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // getting all users
    getAllUsers: getAllUsersQuery,
    // get all users for a company by companyId
    getAllUsersByCompanyId: getAllUsersByCompanyIdQuery,
    // get a user by an id
    getUserById: getUserByIdQuery,
    // get all products for a company by company id
    getAllProductsByCompanyId: getAllProductsByCompanyIdQuery,
    // get Product for specific user by user id
    getProductsByUserId: getProductsByUserIdQuery,
    // get product by id
    getProductById: getProductByIdQuery,
    // get product by product name
    getProductsByProductName: getProductsByProductNameQuery,
    // getting all companies
    getAllCompanies: getAllCompaniesQuery,
    // getting a company by an id
    getCompanyById: getCompanyByIdQuery,
    // getting all tickets for a product
    getTicketsByProductId: getTicketsByProductIdQuery,
    // get a ticket by id
    getTicketById: getTicketByIdQuery,
    // get tickets by specific user by user id
    getTicketsByUserId: getTicketsByUserIdQuery,
    // getting all tickets by company id
    getAllTicketsByCompanyId: getTicketsByCompanyIdQuery,
    // experience
    products: productsPaginateQuery,
  },
});

// All the other CRUD Functionality without the "R", speciffecly (CUD)
const graphqlMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add product
    addProduct: addProductMutation,
    // delete All Companies and users
    deleteAll: deleteAllMutation,
    // registering a user
    registerUser: registerUserMutation,
    // login user
    loginUser: loginUserMutation,
    // registering company
    registerCompany: registerCompanyMutation,
    // add new ticket
    addNewTicket: addTicketMuation,
    // add reply
    addReply: addReplyMutation,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: graphqlMutation,
});
