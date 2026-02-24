const errorHandler = (error, _, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: "malformatted id" })
    }
    else if(error.name === "ValidationError"){
        return response.status(400).json({error: error.message})
    }
    next(error)
}

const unknownEndpoint = (_, res) => {
    res.status(404).send({ error: "Unknown Endpoint!" })
}

export { errorHandler, unknownEndpoint }