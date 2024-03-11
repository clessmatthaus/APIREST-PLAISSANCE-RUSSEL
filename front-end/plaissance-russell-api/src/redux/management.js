import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/authSlice"
import catwayReducer from "../redux/features/catways/catwaySlice"
import filterReducer from "../redux/features/catways/FilterSlice"
import reservationReducer from "../redux/features/reservation/reservationSlice"

export const management = configureStore({
    reducer: {
        auth: authReducer,
        catway: catwayReducer,
        filter: filterReducer,
        reservation: reservationReducer,
    }
})