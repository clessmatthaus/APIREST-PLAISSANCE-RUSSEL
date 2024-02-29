import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import catwayService from './catwayService';
import { toast } from "react-toastify"


const initialState = {
catway: null,
catways: [],
isError: false,
isSuccess: false,
isLoading: false,
type: []
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

//get all catway
export const getCatways = createAsyncThunk( "catways/getAll", async (_, thunkAPI) => {
    try {
        return  await catwayService.getCatways()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a catway
export const deleteCatway = createAsyncThunk( "catways/delete", async (id, thunkAPI) => {
    try {
        return  await catwayService.deleteCatway(id)
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
        const catways = action.payload
        const array = []
        catways.map((item) =>{
            const {type} = item;
            return array.push(type)
        });
        const theType = [...new Set(array)]
        state.type = theType
    } 
  },
  extraReducers: (builder) => {
    builder
    // create catway
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

     // get all catways
        .addCase(getCatways.pending, (state) => {
            state.isLoading = true
    })
        .addCase(getCatways.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError =false
            console.log(action.payload)
            state.catways = action.payload
            
    })
        .addCase(getCatways.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            toast.error(action.payload)
    })

    // delete catway
       .addCase(deleteCatway.pending, (state) => {
        state.isLoading = true
    })
       .addCase(deleteCatway.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Catway supprimé avec succès")  
    })
       .addCase(deleteCatway.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
    })
  }
});

export const { CALC_MANAGEMENT_DATA } = catwaySlice.actions;
export const selectIsLoading = (state) => state.catway.isLoading;
export const selectType = (state) => state.catway.type;

export default catwaySlice.reducer