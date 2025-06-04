import { productService } from '../../services';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '../../models/product';

export const fetchPopularProducts = createAsyncThunk<Product[]>(
    'popularProducts/fetch',
    async (_, thunkAPI) => {
        try {
            const data = await productService.getPopularProducts();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error occurred while fetching popular products.');
            }
        }
    }
);