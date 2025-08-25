import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState, type LoginResponse } from "../type/type";

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loginSuccess : (state, action:PayloadAction<LoginResponse>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        }
    }
});

export const {loginSuccess} = authSlice.actions;
export default authSlice.reducer;