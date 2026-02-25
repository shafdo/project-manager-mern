export interface ClientType {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type CreateClientInput = Omit<ClientType, 'id'>;
