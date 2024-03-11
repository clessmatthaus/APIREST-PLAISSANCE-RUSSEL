import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

const APIBACK_URL=`${API_URL}/api/catways/id/reservations/`

export const createReservation = async (FormData) => {
    const response = await axios.post(APIBACK_URL, formData)
    return response.data
}