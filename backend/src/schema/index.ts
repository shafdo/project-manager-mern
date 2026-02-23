import { GraphQLSchema, GraphQLObjectType } from "graphql";
import clientQueries from "@/schema/queries/clientQueries";
import projectQueries from "@/schema/queries/projectQueries";
import clientMutations from "@/schema/mutations/clientMutations";
import projectMutations from "@/schema/mutations/projectMutations";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    ...clientQueries,
    ...projectQueries,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({ ...clientMutations, ...projectMutations }),
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
