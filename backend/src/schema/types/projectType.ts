import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import ClientType from "@/schema/types/clientType";
import Client from "@/models/Client";

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent) {
        // parent = the project object (project object has clientId field)
        return Client.findById(parent.clientId);
      },
    },
  }),
});

export default ProjectType;
