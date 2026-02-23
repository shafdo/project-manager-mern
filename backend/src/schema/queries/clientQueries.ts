import { GraphQLFieldConfigMap, GraphQLID, GraphQLList } from "graphql";
import ClientType from "@/schema/types/clientType";
import { clients } from "@/schema/sampleData";

const clientQueries: GraphQLFieldConfigMap<unknown, unknown> = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parent, args) {
      return clients;
    },
  },
  client: {
    type: ClientType,
    args: {
      id: {
        type: GraphQLID, // The argument for fetching a client by ID
      },
    },
    resolve(parent, args) {
      return clients.find((client) => client.id === args.id);
    },
  },
};

export default clientQueries;
