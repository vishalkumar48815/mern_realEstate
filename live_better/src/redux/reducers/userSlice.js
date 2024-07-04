import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null ;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state, action) => {
            state.loading = true;
        },
        updateUserFailure: (state, action) => {
            state.loading = false ;
            state.error = action.payload ;

        },
        updatUserSuccess: (state, action) => {
            state.loading = false ;
            state.currentUser = action.payload ;
            state.error = null ;
        },
        signOutUser:  (state) => {
            state.loading = false ;
            state.currentUser = '' ;
            state.error = null ;
        },
        deleteUserStart: (state) => {
            state.loading = true ;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false ;
            state.error = null ;
            state.currentUser = '';
        },
        deleteUserFailure: (state, action) => {
            state.loading = false ;
            state.error = action.payload ;
        },
        signoutUserStart: (state) => {
            state.loading = true ;
        },
        signoutUserSuccess: (state, action) => {
            state.loading = false ;
            state.error = null ;
            state.currentUser = '';
        },
        signoutUserFailure: (state, action) => {
            state.loading = false ;
            state.error = action.payload ;
        }
    }
})


export const  { signInStart, signInSuccess, signInFailure, updateUserStart, updatUserSuccess, updateUserFailure, signOutUser, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutUserStart, signoutUserSuccess, signoutUserFailure} = userSlice.actions ;

export default userSlice.reducer;
