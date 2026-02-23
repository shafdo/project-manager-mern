import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import routes from "@/routes";
import schema from "@/schema";
import connectDB from "@/config/db";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();
// Connect to MongoDB

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
// Express Middleware

// GrahpQL Middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development" ? true : false,
  }),
);
// GrahpQL Middleware

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
