import { gql } from "@apollo/client";

const getAllCompanies = gql`
  query GetAllCompanies {
    getAllCompanies {
      name
    }
  }
`;

export { getAllCompanies };
