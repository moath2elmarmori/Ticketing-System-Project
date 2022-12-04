import { gql } from "@apollo/client";

const getComapnyById = gql`
  query GetCompanyById($id: ID!) {
    getCompanyById(id: $id) {
      name
      users {
        _id
      }
      products {
        _id
      }
      tickets {
        _id
      }
    }
  }
`;

export { getComapnyById };
