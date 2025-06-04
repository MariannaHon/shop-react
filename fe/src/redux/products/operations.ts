import { productService } from '../../services';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '../../models/product';

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetch',
    async (_, thunkAPI) => {
        try {
            const data = await productService.getProducts();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error occurred while fetching products.');
            }
        }
    }
);