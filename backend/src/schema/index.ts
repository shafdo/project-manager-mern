import { GraphQLSchema, GraphQLObjectType } from "graphql";
import clientQueries from "@/schema/queries/clientQueries";
import projectQueries from "@/schema/queries/projectQueries";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    ...clientQueries,
    ...projectQueries,
  }),
});

export default new GraphQLSchema({
  query: RootQuery,
});
