const errorHandler = (error, request, response, next) =>{
    console.error(error.message)
    if (error.name === 'castError'){
        return response.status(400).send({error: "malformatted id"})
    }
    next(error)
}
module.exports = errorHandler