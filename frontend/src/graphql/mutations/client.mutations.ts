import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation AddClient($input: ClientInput!) {
    addClient(input: $input) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: String!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
