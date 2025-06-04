import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import { RegisterResponseBody } from '@/models/auth';

interface AuthState {
    user: RegisterResponseBody | null;
    loggedIn: boolean;
    refresh: boolean;
    loading: boolean;
    error: string | number | unknown | null;
}

const initialState: AuthState = {
    user: null,
    loggedIn: false,
    refresh: false,
    loading: false,
    error: null as string | number | unknown,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.loading = true;
            })
            .addCase(register.fulfilled, state => {
                state.loggedIn = true;
                state.error = null;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logIn.pending, state => {
                state.loading = true;
            })
            .addCase(logIn.fulfilled, state => {
                state.loggedIn = true;
                state.error = null;
                state.loading = false;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logOut.fulfilled, state => {
                state.user = null;
                state.loggedIn = false;
                state.error = null;
            })

            .addCase(refreshUser.pending, state => {
                state.refresh = true;
                state.loading = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loggedIn = true;
                state.refresh = false;
                state.error = null;
                state.loading = false;
            })
            .addCase(refreshUser.rejected, (state, action) => {
                state.user = null;
                state.refresh = false;
                state.error = action.payload;
                state.loading = false;
                state.loggedIn = false;
            });
    },
});

export const authReducer = authSlice.reducer;
