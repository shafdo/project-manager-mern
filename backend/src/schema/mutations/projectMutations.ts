import {
  GraphQLEnumType,
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import ProjectType from "@/schema/types/projectType";
import Project from "@/models/Project";

const projectMutations: GraphQLFieldConfigMap<unknown, unknown> = {
  createProject: {
    type: ProjectType,
    args: {
      clientId: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      status: {
        type: new GraphQLEnumType({
          name: "ProjectStatus",
          values: {
            NOT_STARTED: { value: "Not Started" },
            IN_PROGRESS: { value: "In Progress" },
            DONE: { value: "Done" },
          },
        }),
        defaultValue: "Not Started",
      },
    },
    resolve(parent, args) {
      // Create project logic
      const project = new Project({
        clientId: args.clientId,
        name: args.name,
        description: args.description,
        status: args.status,
      });
      return project.save();
    },
  },
  updateProject: {
    type: ProjectType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: {
        type: new GraphQLEnumType({
          name: "ProjectStatusUpdate",
          values: {
            NOT_STARTED: { value: "Not Started" },
            IN_PROGRESS: { value: "In Progress" },
            DONE: { value: "Done" },
          },
        }),
      },
    },
    resolve(parent, args) {
      // Update project logic
      return Project.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status,
          },
        },
        { new: true },
      );
    },
  },
  deleteProject: {
    type: ProjectType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve(parent, args) {
      return Project.findByIdAndDelete(args.id);
    },
  },
};

export default projectMutations;
