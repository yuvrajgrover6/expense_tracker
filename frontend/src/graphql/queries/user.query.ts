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

export default GET_USER;
