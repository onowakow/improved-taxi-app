const mongoose = require("mongoose");

const url = process.env.MONGODB_URI


/*
const password = "pepsicola";

const url = `
  mongodb://owen:${password}@cluster0-shard-00-00.23a4d.mongodb.net:27017,cluster0-shard-00-01.23a4d.mongodb.net:27017,cluster0-shard-00-02.23a4d.mongodb.net:27017/rideTestDB?ssl=true&replicaSet=atlas-rmjgyh-shard-0&authSource=admin&retryWrites=true&w=majority
`;*/

mongoose
  .connect(url)
  .then((response) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error.message);
  });

const rideSchema = new mongoose.Schema({
  riderName: String,
  pickupLocation: String,
  dropoffLocation: String,
  timeRequested: Date,
  pickupTime: Date,
  dropoffTime: Date,
  status: Number,
  driver: Number,
});

/* Code borrowed from Full Stack Open. 
 This transforms the information stored in MongoDB to not include
 the version of mongoDB. It also changes the ID object into a string */
rideSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


module.exports = mongoose.model('Ride', rideSchema)