const express = require('express')
const cors = require('cors')
const app = express()

// Allow cross origin resource sharing
app.use(cors())

// JSON parser used for adding data to server
app.use(express.json())

let ridesDB = [
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

// Index page
app.get('/', (request, response) => {
  response.send('Hello, world!')
})

// Return full json object
app.get('/api/rides', (request, response) => {
  response.json(ridesDB)
})

// Return ride by id
app.get('/api/rides/:id', (request, response) => {
  const id = Number(request.params.id)
  const ride = ridesDB.find(ride => ride.rideId === id)
  ride ? response.json(ride)
    : response.status(404).end()
})

// Delete ride by id
app.delete('/api/rides/:id', (request, response) => {
  const id = Number(request.params.id)
  ridesDB = ridesDB.filter(ride => ride.rideId !== id)
  
  // 204. No content to return.
  response.status(204).end()
})

// Create new ride
app.post('/api/rides', (request, response) => {
  const newId = Math.floor(Math.random() * 100000) + 1
  const ride = request.body

  const rideObj = {
    rideId: newId,
    riderName: ride.riderName,
    pickupLocation: ride.pickupLocation,
    dropoffLocation: ride.dropoffLocation,
    timeRequested: new Date(),
    pickupTime: undefined,
    dropoffTime: undefined,
    driver: undefined,
  }
  ridesDB = ridesDB.concat(rideObj)
  response.json(rideObj)
})

// Update ride by id 
app.put('/api/rides/:id', (request, response) => {
  // request body contains object with fields that will be modified. All other fields will remain.
  // Object.assign(target, ...sources)

  const id = Number(request.params.id)
  const body = request.body

  const rideCopy = ridesDB.find(ride => ride.rideId === id)

  // Creates new object, overriding rideCopy information with body information (later arguments override earlier objects)
  const newRide = Object.assign({}, rideCopy, body)

  ridesDB = ridesDB.map(ride => ride.rideId === id ? newRide : ride)
  // Status 201 -- successful resource creation
  response.status(201).end()
})

const PORT = 3002
app.listen(PORT, () => {
  console.log('Server running on port 3002')
})
