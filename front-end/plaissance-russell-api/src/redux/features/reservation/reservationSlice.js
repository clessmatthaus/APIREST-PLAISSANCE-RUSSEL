import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    reservation: null,
    reservations : [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    CALC_RESERVATION(state, action){
        console.log("reservation")
    }
  },
  extraReducers: (builder) => {

  }
});

export const {CALC_RESERVATION} = reservationSlice.actions

export default reservationSlice.reducer

