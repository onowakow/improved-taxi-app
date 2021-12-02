const fs = require("fs");

// Import express library
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

let aboutMessage = "IssueTracker API v1.0";

// Server 'database.' Memory not sustained.
const ridesDB = [
  {
    rideId: 5492,
    riderName: "Owen",
    pickupLocation: "Classroom",
    dropoffLocation: "Downtown",
    timeRequested: "00:09:10",
    pickupTime: "00:09:35",
    dropoffTime: "00:09:46",
    driverAssigned: "419",
  },
  {
    rideId: 672,
    riderName: "Josie",
    pickupLocation: "Walmart",
    dropoffLocation: "Downtown",
    timeRequested: "00:09:41",
    pickupTime: "00:10:01",
    dropoffTime: "00:10:23",
    driverAssigned: "421",
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
  },
};

// First arg (obj) is for nested queries. '_'
function setAboutMessage(_, { message }) {
  // Returning *some* value helps user see that resolver worked.
  return (aboutMessage = message);
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
