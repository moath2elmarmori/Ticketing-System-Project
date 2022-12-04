import { gql } from "@apollo/client";

const addProduct = gql`
  mutation AddProudct($name: String!, $category: String!) {
    addProduct(name: $name, category: $category) {
      _id
      name
      category
      createdBy {
        username
      }
    }
  }
`;

export { addProduct };
