import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

const APIBACK_URL=`${API_URL}/api/catways/`

//create new catway
export const createCatway = async (formData) => {
    const response = await axios.post(APIBACK_URL, formData)
    return response.data
}
//get all catways
export const getCatways = async (formData) => {
    const response = await axios.get(APIBACK_URL)
    return response.data
}

const catwayService = {
    createCatway,
    getCatways
}

export default catwayService;