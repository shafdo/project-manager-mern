import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    client(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const GET_CLIENTS_CUSTOM = (fields: string) => gql`
  query GetClientsCustom {
    clients {
      ${fields}
    }
  }
`;
