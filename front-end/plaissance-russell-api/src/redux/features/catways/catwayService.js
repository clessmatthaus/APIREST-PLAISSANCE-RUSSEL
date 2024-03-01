import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

const APIBACK_URL=`${API_URL}/api/catways/`

//create new catway
export const createCatway = async (formData) => {
    const response = await axios.post(APIBACK_URL, formData)
    return response.data
}
//get all catways
export const getCatways = async () => {
    const response = await axios.get(APIBACK_URL)
    return response.data
}
//get single catway
const getCatway = async (id) => {
    const response = await axios.get(APIBACK_URL + id)
    return response.data
}
//delete catway
const deleteCatway = async (id) => {
    const response = await axios.delete(APIBACK_URL + id)
    return response.data
}
//update catway
const updateCatway = async (id, formData) => {
    const response = await axios.put(`${APIBACK_URL}${id}`, formData )
    return response.data
}

const catwayService = {
    createCatway,
    getCatways,
    getCatway,
    deleteCatway,
    updateCatway,
}

export default catwayService;