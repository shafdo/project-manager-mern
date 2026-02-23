import ClientType from "@/schema/types/clientType";
import Client from "@/models/Client";
import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLString } from "graphql";

const clientMutations: GraphQLFieldConfigMap<unknown, unknown> = {
  createClient: {
    type: ClientType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args: { name: string; email: string; phone: string }) {
      // Create client logic
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });
      return client.save();
    },
  },
  updateClient: {
    type: ClientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    resolve(parent, args) {
      // Update client logic
      return Client.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            email: args.email,
            phone: args.phone,
          },
        },
        { new: true },
      );
    },
  },
  deleteClient: {
    type: ClientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args: { id: string }) {
      return Client.findByIdAndDelete(args.id);
    },
  },
};

export default clientMutations;
