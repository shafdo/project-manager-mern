import { GraphQLFieldConfigMap, GraphQLID, GraphQLList } from "graphql";
import ProjectType from "@/schema/types/projectType";
import { projects } from "@/schema/sampleData";

const projectQueries: GraphQLFieldConfigMap<unknown, unknown> = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve(parent, args) {
      return projects;
    },
  },
  project: {
    type: ProjectType,
    args: {
      id: {
        type: GraphQLID, // The argument for fetching a project by ID
      },
    },
    resolve(parent, args) {
      return projects.find((project) => project.id === args.id);
    },
  },
};

export default projectQueries;
