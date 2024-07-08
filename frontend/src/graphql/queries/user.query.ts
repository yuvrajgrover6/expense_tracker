import { DocumentNode, gql } from "@apollo/client";

const GET_USER: DocumentNode = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePic
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS: DocumentNode = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      name
      profilePic
      # relationships
      transactions {
        _id
        category
        description
        paymentType
        amount
        location
        date
      }
    }
  }
`;

export default GET_USER;
