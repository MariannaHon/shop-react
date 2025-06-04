import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    LoginRequestBody,
    RegisterRequestBody,
    LoginResponseBody,
    RegisterResponseBody,
} from '@/models/auth';
import { authService, userService } from '@/services';
import { toast } from 'react-hot-toast';
import type { AxiosError } from 'axios';

interface ServerValidationError {
    errors?: { msg: string }[];
    message?: string;
    error?: string;
}

export const register = createAsyncThunk<
    RegisterResponseBody,
    RegisterRequestBody
>('auth/register', async (newUser, thunkAPI) => {
    try {
        const data = await authService.register(newUser);
        toast.success('Successfully registered a user!');
        return data;
    } catch (error) {
        const err = error as AxiosError<ServerValidationError>;

        const status = err.response?.status;

        const message =
            err.response?.data?.errors?.[0]?.msg ||
            err.response?.data?.message ||
            err.response?.data?.error ||
            'Unknown error occurred';

        if (status === 400) {
            toast.error('Invalid input or this email is already registered.');
        } else if (status === 500) {
            toast.error('Server error. Please try again later.');
        } else {
            toast.error(message);
        }

        return thunkAPI.rejectWithValue(message);
    }
});

export const logIn = createAsyncThunk<LoginResponseBody, LoginRequestBody>(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            const data = await authService.login(user);
            return data;
        } catch (error) {
            const err = error as AxiosError<ServerValidationError>;

            const status = err.response?.status;

            const message =
                err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Unknown error occurred';

            if (status === 400) {
                toast.error('Invalid input. Please check your data.');
            } else if (status === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error(message);
            }

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        console.log('Logout called');
        authService.logout();
        return true;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            return thunkAPI.rejectWithValue('An unknown error occurred.');
        }
    }
});

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const token = authService.refresh();
        if (token === null)
            return thunkAPI.rejectWithValue('Unable to fetch user');
        try {
            const user = await userService.getUser();
            return user;
        } catch (error) {
            authService.logout();
            const err = error as AxiosError<ServerValidationError>;

            const status = err.response?.status;

            const message =
                err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Unknown error occurred';

            if (status === 400) {
                toast.error('Invalid input. Please check your data.');
            } else if (status === 401) {
                toast.error('Unauthorized. Please log in again.');
            } else if (status === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error(message);
            }

            return thunkAPI.rejectWithValue(message);
        }
    }
);
