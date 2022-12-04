import { gql } from "@apollo/client";

const ADD_NEW_TICKET = gql`
  mutation AddNewTicket(
    $classification: String!
    $ticketText: String!
    $status: String!
    $product: ID!
  ) {
    addNewTicket(
      classification: $classification
      ticketText: $ticketText
      status: $status
      product: $product
    ) {
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

export { ADD_NEW_TICKET };
