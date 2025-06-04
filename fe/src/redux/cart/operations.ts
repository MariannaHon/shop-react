import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddToCartPayload, CartResponseBody } from '@/models/cart';
import { cartService, authService } from '@/services';
import { toast } from 'react-hot-toast';
import type { AxiosError } from 'axios';

export const addToCart = createAsyncThunk<CartResponseBody, AddToCartPayload>(
    'cart/add',
    async (item, thunkAPI) => {
        try {
            const data = await cartService.addToCart(item);
            toast.success('Successfully added an item to the cart!');
            return data;
        } catch (error) {
            const err = error as AxiosError;

            const status = err.response?.status;

            if (status === 400) {
                toast.error('This email is already registered.');
            } else if (status === 500) {
                toast.error('Server error. Please try again later.');
            } else if (status === 401) {
                authService.logout();
                toast.error('Unauthorized. Please log in again.');
            } else {
                toast.error('Unknown error occurred');
            }

            return thunkAPI.rejectWithValue(
                'Unknown error. Please try again later'
            );
        }
    }
);

export const getCart = createAsyncThunk<CartResponseBody>(
    'cart/fetch',
    async (_, thunkAPI) => {
        try {
            const data = await cartService.getCart();
            return data;
        } catch (error) {
            const err = error as AxiosError;

            const status = err.response?.status;

            if (status === 500) {
                toast.error('Server error. Please try again later.');
            } else if (status === 401) {
                authService.logout();
                toast.error('Unauthorized. Please log in again.');
            } else {
                toast.error('Unknown error occurred');
            }

            return thunkAPI.rejectWithValue(
                'Unknown error. Please try again later'
            );
        }
    }
);

interface UpdateCartArgs {
    itemId: string;
    quantity: number;
}

export const updateCart = createAsyncThunk<CartResponseBody, UpdateCartArgs>(
    'cart/update',
    async ({ itemId, quantity }, thunkAPI) => {
        try {
            const data = await cartService.updateCartItem(itemId, { quantity });
            toast.success('Successfully updated an item!');
            return data;
        } catch (error) {
            const err = error as AxiosError;

            const status = err.response?.status;

            if (status === 400) {
                toast.error('Input invalid data. Please check your data.');
            } else if (status === 500) {
                toast.error('Server error. Please try again later.');
            } else if (status === 401) {
                authService.logout();
                toast.error('Unauthorized. Please log in again.');
            } else {
                toast.error('Unknown error occurred');
            }

            return thunkAPI.rejectWithValue(
                'Unknown error. Please try again later'
            );
        }
    }
);

interface RemoveItemArgs {
    itemId: string;
}

export const removeItem = createAsyncThunk<CartResponseBody, RemoveItemArgs>(
    'cart/remove',
    async ({ itemId }, thunkAPI) => {
        try {
            const data = await cartService.removeCartItem(itemId);
            toast.success('Successfully removed an item!');
            return data;
        } catch (error) {
            const err = error as AxiosError;

            const status = err.response?.status;

            if (status === 400) {
                toast.error('Input invalid data. Please check your data.');
            } else if (status === 500) {
                toast.error('Server error. Please try again later.');
            } else if (status === 401) {
                authService.logout();
                toast.error('Unauthorized. Please log in again.');
            } else {
                toast.error('Unknown error occurred');
            }

            return thunkAPI.rejectWithValue(
                'Unknown error. Please try again later'
            );
        }
    }
);
