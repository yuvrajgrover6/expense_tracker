import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      description
      paymentType
      category
      amount
      location
      date
      user {
        _id
        username
        name
        profilePic
      }
    }
  }
`;

export const CATEGORY_STATS = gql`
  query CategoryStats {
    categoryStatistics {
      category
      amount
    }
  }
`;
