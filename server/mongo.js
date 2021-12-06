const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Provide: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `
  mongodb://owen:${password}@cluster0-shard-00-00.23a4d.mongodb.net:27017,cluster0-shard-00-01.23a4d.mongodb.net:27017,cluster0-shard-00-02.23a4d.mongodb.net:27017/rideTestDB?ssl=true&replicaSet=atlas-rmjgyh-shard-0&authSource=admin&retryWrites=true&w=majority
`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  isMale: Boolean,
})

const Person = mongoose.model('Person', personSchema)

/*
const person = new Person({
  name: "Josie",
  birthDate: new Date(2000, 3, 26),
  isMale: false,
})


person.save().then(result => {
  console.log('Person saved.')
  mongoose.connection.close()
}
*/

Person.find({ isMale: false }).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})
