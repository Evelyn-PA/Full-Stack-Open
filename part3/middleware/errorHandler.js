const errorHandler = (error, _, response, next) => {
    console.error(error.message)
    if (error.name === 'castError') {
        return response.status(400).send({ error: "malformatted id" })
    }
    next(error)
}

const unknownEndpoint = (_, res) => {
    res.status(404).send({ error: "Unknown Endpoint!" })
}


export { errorHandler, unknownEndpoint }