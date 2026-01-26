import axios from "axios"
const baseURL = 'http://localhost:3001/persons'

//Get the data
const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

//Create or add data 
const addData = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

//Delete data
const deleteData = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

//Change or Update data 
const changeData = (id, updatedPerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatedPerson)
    return request.then(response => response.data)
}
export default {
    getAll: getAll,
    addData: addData,
    deleteData: deleteData,
    changeData: changeData
}