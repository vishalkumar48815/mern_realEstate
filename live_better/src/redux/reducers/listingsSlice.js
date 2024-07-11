import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listings: [],
    error: null,
    loading: false
}

const listingSlice = createSlice({
    name: "userListings",
    initialState,
    reducers: {
        getListingsStart: (state) =>  {
           state.loading = true ;
           state.error = null ;
        },
        getListingSuccess: (state, action) => {
            state.listings = action.payload
            state.loading = false ;
            state.error = null ;
        },
        getListingFailure: (state, action) => {
            state.loading = false ;
            state.error = action.payload ;
        }

    }
})


export const {getListingsStart, getListingSuccess, getListingFailure} = listingSlice.actions

export default listingSlice.reducer ;