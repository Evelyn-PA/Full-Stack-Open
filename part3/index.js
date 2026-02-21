require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PhoneBook = require('./models/phonebook')

app.use(express.json())
// app.use(morgan('tiny')) //Morgan Middleware 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

//Use static
app.use(express.static('dist'))

//Morgan Token
morgan.token('type', (req, res) => {
    if (req.method === "POST") {
        const { id, ...rest } = req.body
        return JSON.stringify(rest)
    }
    return ""
})

//Get the info
app.get("/info", async(req, res) => {
    const total = await PhoneBook.countDocuments({ name: { $exists: true } })
    const CurrentTime = new Date()
    res.send(
        `<p>Phonebook has info for ${total} people </p>
        <p>${CurrentTime}</p>
       `
    )
})

//Get the API/persons
app.get("/api/persons", (req, res) => {
    PhoneBook.find({}).then(person => {
        res.json(person)
    })
})

//Get data by ID
app.get("/api/persons/:id", (req, res) => {
    PhoneBook.findById(req.params.id).then(personSaved => {
        if (personSaved) {
            res.json(personSaved)
        }
        else {
            res.status(404).end()
        }
    })
        .catch(error => {
            res.status(400).send({ error: "Id not found" })
        })
})

//Delete the data by ID
app.delete("/api/persons/:id", (req, res) => {
    PhoneBook.findByIdAndDelete(req.params.id).then(result => {
        if (result) {
            res.status(204).end()
        }
    })
        .catch(error => {
            console.error(error)
            res.status(400).send({ error: "Error with the ID " })
        })
})

//Post the data
app.post("/api/persons/", (req, res) => {
    const personData = req.body

    if (!personData.name || !personData.number) {
        return res.status(400).json({
            error: "The name or number is missing"
        })
    }

    PhoneBook.findOne({ name: personData.name }).then(existingPerson => {
        if (existingPerson) {
            return res.status(400).json({
                error: "Name must be unique"
            })
        }

        //Create new instance 
        const personToSave = new PhoneBook({
            name: personData.name,
            number: personData.number
        })

        //Save to the database
        personToSave.save().then(
            savedPerson => {
                res.json(savedPerson)
            }
        )
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})