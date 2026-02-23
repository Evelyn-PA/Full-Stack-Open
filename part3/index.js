require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PhoneBook = require('./models/phonebook')
const { errorHandler, unknownEndpoint } = require('./middleware/errorHandler')

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

//Use static
app.use(express.static('dist'))

//Morgan Token
morgan.token('type', (req, res) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
    return ""
})

//Get the info
app.get("/info", async (req, res, next) => {
    try {
        const total = await PhoneBook.countDocuments({})
        const CurrentTime = new Date()
        res.send(
            `<p>Phonebook has info for ${total} people </p>
        <p>${CurrentTime}</p>
       `)
    }
    catch (error) {
        next(error)
    }
})

//Get the API/persons
app.get("/api/persons", async (req, res, next) => {
    try {
        const persons = await PhoneBook.find({})
        res.json(persons)
    }
    catch (error) {
        next(error)
    }
})

//Get data by ID
app.get("/api/persons/:id", async (req, res, next) => {
    try {
        const personSaved = await PhoneBook.findById(req.params.id)
        if (personSaved) {
            res.json(personSaved)
        }
        else {
            res.status(404).end()
        }
    }
    catch (error) {
        next(error)
    }
})

//Delete the data by ID
app.delete("/api/persons/:id", async (req, res, next) => {
    try {
        await PhoneBook.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }
    catch (error) {
        next(error)
    }
})

//Post the data
app.post("/api/persons", async (req, res, next) => {
    const personData = req.body

    if (!personData.name || !personData.number) {
        return res.status(400).json({
            error: "The name or number is missing"
        })
    }
    try {
        const existingPerson = await PhoneBook.findOne({ name: personData.name })
        const personToSave = new PhoneBook({
            name: personData.name,
            number: personData.number
        })

        const savedPerson = await personToSave.save()
        res.json(savedPerson)
    }
    catch (error) {
        next(error)
    }
})

//Put (Change/Edit) the data
app.put("/api/persons/:id", async (req, res, next) => {
    const { name, number } = req.body
    try {
        const findPerson = await PhoneBook.findById(req.params.id)
        if (!findPerson) {
            return res.status(404).end()
        }
        findPerson.number = number
        findPerson.name = name

        const updatedPerson = await findPerson.save()
        res.json(updatedPerson)
    }

    catch (error) {
        next(error)
    }
})

//Use error hanlder
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})