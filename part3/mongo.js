const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("give password as argument & data")
    process.exit(1)
}



const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://phuonganhnguyen6165_db_user:${password}@cluster0.qp7sjdp.mongodb.net/PhoneBook?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })  //Always use IPv4

const phoneBookSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})

const phoneBook = mongoose.model("phoneBook", phoneBookSchema)



if (process.argv.length === 3) {
    console.log("Phonebook:")
    phoneBook.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length === 5) {
    const phonebook = new phoneBook({
        id: "1",
        name: name,
        number: number
    })

    phonebook.save().then(result => {
        console.log(`Added ${name} and ${number} to phonebook`)
        mongoose.connection.close()
    });
}