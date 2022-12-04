import { gql } from "@apollo/client";

const GET_ALL_TICKETS_BY_COMPANY_ID = gql`
  query GetAllTicketsByCompanyId($id: ID!) {
    getAllTicketsByCompanyId(id: $id) {
      _id
      ticketText
      classification
      status
      user {
        username
      }
      product
    }
  }
`;

const GET_TICKETS_BY_PRODUCT_ID = gql`
  query GetTicketsByProductId($id: ID!) {
    getTicketsByProductId(id: $id) {
      _id
      ticketText
      classification
      status
      user {
        username
      }
      product
    }
  }
`;

const GET_TICKETS_BY_USER_ID = gql`
  query GetTicketsByUserId($id: ID!) {
    getTicketsByUserId(id: $id) {
      _id
      ticketText
      classification
      status
      user {
        username
      }
      product
    }
  }
`;

const GET_TICKET_BY_ID = gql`
  query GetTicketById($id: ID!) {
    getTicketById(id: $id) {
      ticketText
      classification
      status
      createdAt
      user {
        username
        role
      }
      product
      replies {
        _id
        replyText
        createdAt
        user {
          username
          role
        }
      }
    }
  }
`;

export {
  GET_ALL_TICKETS_BY_COMPANY_ID,
  GET_TICKETS_BY_PRODUCT_ID,
  GET_TICKETS_BY_USER_ID,
  GET_TICKET_BY_ID,
};
