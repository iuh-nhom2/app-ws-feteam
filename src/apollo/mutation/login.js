import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation userLogin($userName: String!, $password: String!) {
    userLogin(userName: $userName, password: $password){
      id,
      userId
      token
      userName
    }
  }
`;

export default LOGIN_USER;