const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Provide: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

console.log(password)

const url = `
  mongodb://owen:${password}@cluster0-shard-00-00.23a4d.mongodb.net:27017,cluster0-shard-00-01.23a4d.mongodb.net:27017,cluster0-shard-00-02.23a4d.mongodb.net:27017/rideTestDB?ssl=true&replicaSet=atlas-rmjgyh-shard-0&authSource=admin&retryWrites=true&w=majority
`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  isMale: Boolean,
})

const Person = mongoose.Schema('Person', personSchema)

const person = new Person({
  name: "Owen",
  birthDate: new Date(1998, 10, 8),
  isMale: true,
})

person.save().then(result => {
  console.log('Person saved.')
  mongoose.connection.close()
})