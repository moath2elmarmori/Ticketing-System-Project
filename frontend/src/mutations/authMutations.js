import { gql } from "@apollo/client";

const registerCompany = gql`
  mutation RegisterCompany($name: String!, $passcode: String!) {
    registerCompany(name: $name, passcode: $passcode) {
      _id
      name
      passcode
    }
  }
`;

const registerUser = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $extension: Float!
    $role: UserRoleRegister!
    $companyName: String!
    $companyPasscode: String!
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      extension: $extension
      role: $role
      companyName: $companyName
      companyPasscode: $companyPasscode
    ) {
      _id
      token
      companyId
      role
    }
  }
`;

const loginUser = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      token
      companyId
      role
    }
  }
`;

export { registerCompany, registerUser, loginUser };
