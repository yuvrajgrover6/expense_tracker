import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Signup($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;
