import { gql } from "@apollo/client";

const getAllProductsByCompanyId = gql`
  query GetAllProductsByCompanyId($id: ID!, $limit: Int!, $skip: Int!) {
    getAllProductsByCompanyId(id: $id, limit: $limit, skip: $skip) {
      name
      category
      _id
      createdBy {
        username
      }
    }
  }
`;

const GET_PRODUCTS_BY_USER_ID = gql`
  query GetProductsByUserId($id: ID!) {
    getProductsByUserId(id: $id) {
      name
      category
      _id
      createdBy {
        username
      }
    }
  }
`;

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      _id
      name
      category
    }
  }
`;

const GET_PRODUCTS_BY_PRODUCT_NAME = gql`
  query GetProductByProductName($name: String!) {
    getProductsByProductName(name: $name) {
      name
      category
      _id
      createdBy {
        username
      }
    }
  }
`;

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $skip: Int!) {
    products(limit: $limit, skip: $skip) {
      name
      category
      _id
      createdBy {
        username
      }
    }
  }
`;

export {
  getAllProductsByCompanyId,
  GET_PRODUCTS_BY_USER_ID,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_PRODUCT_NAME,
  GET_PRODUCTS,
};
