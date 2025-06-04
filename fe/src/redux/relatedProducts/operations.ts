import { productService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRelatedProducts = createAsyncThunk(
    '/products/fetchRelated',
    async (id: string, thunkAPI) => {
        try {
            const data = await productService.getRelatedProducts(id);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error occurred while fetching related products.');
            }
        }
    }
);