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
        }
    }
})


export const  { signInStart, signInSuccess, signInFailure, updateUserStart, updatUserSuccess, updateUserFailure} = userSlice.actions ;

export default userSlice.reducer;
