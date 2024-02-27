import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filteredCatways: [],
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_CATWAYS(state, action) {
       const {catways, search} = action.payload;
       const tempCatways = catways.filter(
        (catway) =>
        catway.catwayNumber.toString().toLowerCase().includes(search.toLowerCase()) ||
        catway.type.toString().toLowerCase().includes(search.toLowerCase())
        );
       state.filteredCatways = tempCatways  
    },
  },
});

export const { FILTER_CATWAYS } = FilterSlice.actions

export const selectFilteredCatways = (state) => state.filter.filteredCatways;

export default FilterSlice.reducer