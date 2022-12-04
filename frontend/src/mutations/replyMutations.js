import { gql } from "@apollo/client";

const ADD_REPLY = gql`
  mutation AddReply($replyText: String!, $ticketId: ID!) {
    addReply(replyText: $replyText, ticketId: $ticketId) {
      replyText
    }
  }
`;

export { ADD_REPLY };
