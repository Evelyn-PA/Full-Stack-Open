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
app.get("/info", (req, res) => {
    PhoneBook.countDocuments({}).then(
        total => {
            const CurrentTime = new Date()
            res.send(
                `<p>Phonebook has info for ${total} people </p>
        <p>${CurrentTime}</p>
       `)
        })
        .catch(error=>{
            console.log(error)
            res.status(500).send({error: "Server error while counting"})
        })
})

//Get the API/persons
app.get("/api/persons", (req, res) => {
    PhoneBook.find({}).then(persons => {
        res.json(persons)
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
            res.status(400).send({ error: "malformatted id" })
        })
})

//Delete the data by ID
app.delete("/api/persons/:id", (req, res) => {
    PhoneBook.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end()
    })
        .catch(error => {
            console.error(error)
            res.status(400).send({ error: "malformatted id" })
        })
})

//Post the data
app.post("/api/persons", async (req, res) => {
    const personData = req.body

    if (!personData.name || !personData.number) {
        return res.status(400).json({
            error: "The name or number is missing"
        })
    }
    try{
        const existingPerson = await PhoneBook.findOne({name: personData.name})
        if (existingPerson) {
            return res.status(400).json({
                error: "Name must be unique"
            })
        }
        const personToSave = new PhoneBook({
            name: personData.name,
            number: personData.number
        })

        const savedPerson = await personToSave.save()
        res.json(savedPerson)
    }
    catch (error) {
        res.status(500).json({error: "Server error"})
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})