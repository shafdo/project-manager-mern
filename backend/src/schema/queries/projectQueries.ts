import { GraphQLFieldConfigMap, GraphQLID, GraphQLList } from "graphql";
import ProjectType from "@/schema/types/projectType";
import Project from "@/models/Project";

const projectQueries: GraphQLFieldConfigMap<unknown, unknown> = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve(parent, args) {
      return Project.find(); // Fetch all projects from the database
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
      return Project.findById(args.id); // Fetch a single project by ID from the database
    },
  },
};

export default projectQueries;
