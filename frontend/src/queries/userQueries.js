import { gql } from "@apollo/client";

const getAllUsersByCompanyId = gql`
  query GetAllUsersByCompanyId($id: ID!) {
    getAllUsersByCompanyId(id: $id) {
      username
      _id
      products {
        _id
      }
      tickets {
        _id
      }
    }
  }
`;

const getUserById = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      _id
      username
      products {
        _id
      }
      extension
      role
      tickets {
        _id
      }
    }
  }
`;

export { getAllUsersByCompanyId, getUserById };
