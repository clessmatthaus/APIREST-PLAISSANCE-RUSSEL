import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catwayService from './catwayService';
import { toast } from "react-toastify"


const initialState = {
catway: null,
catways: [],
isError: false,
isSuccess: false,
isLoading: false,
message: "",
};

//create new catway
export const createCatway = createAsyncThunk( "catways/create", async (formData, thunkAPI) => {
    try {
        return  await catwayService.createCatway(formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

const catwaySlice = createSlice({
  name: "catway",
  initialState,
  reducers: {
    CALC_MANAGEMENT_DATA(state, action){
        console.log("gestion des données")
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(createCatway.pending, (state) => {
            state.isLoading = true
    })
        .addCase(createCatway.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload)
            state.catways.push(action.payload)
            toast.success("Catway créer avec succès")
    })
        .addCase(createCatway.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
    })
  }
});

export const { CALC_MANAGEMENT_DATA } = catwaySlice.actions;

export const selectIsLoading = (state) => state.catway.isLoading;

export default catwaySlice.reducer