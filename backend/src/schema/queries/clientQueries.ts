import { GraphQLFieldConfigMap, GraphQLID, GraphQLList } from "graphql";
import ClientType from "@/schema/types/clientType";
import Client from "@/models/Client";

const clientQueries: GraphQLFieldConfigMap<unknown, unknown> = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parent, args) {
      return Client.find(); // Fetch all clients from the database
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
      return Client.findById(args.id); // Fetch a single client by ID from the database
    },
  },
};

export default clientQueries;
