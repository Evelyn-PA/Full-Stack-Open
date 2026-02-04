const express = require('express')
const app = express()

//Access the data easily (Convert raw JSON to JS object)
app.use(express.json())
let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "4",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get('/api/notes',(req, res) =>{
    res.json(notes)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

//Add the data using POST
app.post('/api/notes', (req,res) =>{
    const note = req.body
    console.log(note)
    res.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})