import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },

        logout: {
            isFetching: false,
            isLogout: false,
            error: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFail: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.logout.isLogout = true;
            state.logout.error = false;
        },
        logoutFail: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
    },
});

export const { loginStart, loginFail, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
