const fs = require("fs");
// GraphQLScalarType is a constructor
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

// Import express library
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

let aboutMessage = "IssueTracker API v1.0";

// Resolver for custom scalar
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  // serialize method converts date type to string
  serialize(value) {
    return value.toISOString()
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined
  },
  parseValue(value) {
    return new Date(value)
  }
})

// Server 'database.' Memory not sustained.
const ridesDB = [
  {
    rideId: 5492,
    riderName: "Owen",
    pickupLocation: "Classroom",
    dropoffLocation: "Downtown",
    timeRequested: new Date(2021, 11, 4, 10, 36, 59),
    pickupTime: new Date(2021, 11, 4, 10, 45, 23),
    dropoffTime: new Date(2021, 11, 4, 11, 5, 51),
    driver: "419",
  },
  {
    rideId: 672,
    riderName: "Josie",
    pickupLocation: "Walmart",
    dropoffLocation: "Downtown",
    timeRequested: new Date(2021, 11, 4, 9, 24, 12),
    pickupTime: new Date(2021, 11, 4, 9, 35, 10),
    dropoffTime: new Date(2021, 11, 4, 9, 39, 42),
    driver: "421",
  },
];

const rideList = () => {
  return ridesDB
}

const resolvers = {
  Query: {
    about: () => aboutMessage,
    rideList,
  },
  Mutation: {
    setAboutMessage,
    rideAdd
  },
  GraphQLDate,
};

// First arg (obj) is for nested queries. '_'
function setAboutMessage(_, { message }) {
  // Returning *some* value helps user see that resolver worked.
  return (aboutMessage = message);
}

function rideAdd(_, { ride }) {
  ride.timeRequested = new Date()
  ride.rideId = Math.floor(Math.random()*100000) + 1
  ridesDB.push(ride)
  return ride
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./schema.graphql", "utf-8"),
  resolvers,
});

// Initialize app
const app = express();

server.applyMiddleware({ app, path: "/graphql" });

app.get("/", (req, res) => {
  res.send("Request received");
});

app.listen(3001, () => {
  console.log("Listening on https://localhost:3001");
});
