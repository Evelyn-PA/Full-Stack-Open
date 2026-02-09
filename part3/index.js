const express = require('express')
const morgan = require('morgan')
const app = express()

//The Data
let person = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.use(express.json())
// app.use(morgan('tiny')) //Morgan Middleware 

//Morgan Token
morgan.token('type', (req, res) => {
    if (req.method === "POST") {
        const { id, ...rest } = req.body
        return JSON.stringify(rest)
    }
    return ""
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
//Get the info
app.get("/info", (req, res) => {
    const total = person.length
    const CurrentTime = new Date()
    res.send(
        `<p>Phonebook has info for ${total} people </p>
        <p>${CurrentTime}</p>
       `
    )
})

//Get the API/persons
app.get("/api/persons", (req, res) => {
    res.json(person)
})

//Get data by ID
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const personData = person.find(p => p.id === id)

    if (personData) {
        res.json(personData)
    }
    else {
        res.status(404).end()
    }
})

//Delete the data by ID
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    person = person.filter(p => p.id !== id)
    res.status(204).end()
})

//Post the data
app.post("/api/persons/", (req, res) => {
    const personData = req.body
    personData.id = String(Math.floor(Math.random() * 46) + 5)
    if (person.some(p => p.name === personData.name)) {
        return res.status(400).json({
            error: "Name must be unique"
        })
    }

    else if (!personData.name || !personData.number) {
        return res.status(400).json({
            error: "The name or number is missing"
        })
    }
    person = person.concat(personData)
    res.json(personData)
})

PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})