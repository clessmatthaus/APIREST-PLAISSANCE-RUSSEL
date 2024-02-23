import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/authSlice"
import catwayReducer from "../redux/features/catways/catwaySlice"


export const management = configureStore({
    reducer: {
        auth: authReducer,
        catway: catwayReducer,
    }
})