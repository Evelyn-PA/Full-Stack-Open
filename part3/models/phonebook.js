const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })  //Always use IPv4 
    .then(result => {
        console.log("Connected to MongoDB")
    })

    .catch(error => {
        console.log("Error connecting to MongoDB: ", error.message)
    })

//Create the database schema
const Phonebookschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: function(v){
            return /^\d{2,3}-\d{5,}$/.test(v) 
        },
        message: props => `${props.value} is not a valid phone number`
    }
})

//Handle and modify the schema to clean up the data (remove the __v)
Phonebookschema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Export the model
module.exports = mongoose.model("PhoneBook", Phonebookschema)