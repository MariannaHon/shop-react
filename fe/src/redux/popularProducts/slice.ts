import { Product } from "@/models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPopularProducts } from "./operations";

interface ProductState {
    popularProducts: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    popularProducts: [],
    loading: false,
    error: null,
}

function handleLoading(state: ProductState) {
    state.loading = true;
    state.error = null;
}

function handleError(state: ProductState, action: PayloadAction<unknown>) {
    state.loading = false;
    state.error = action.payload as string | null;
}

const popularProducts = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => 
        builder
            .addCase(fetchPopularProducts.pending, handleLoading)
            .addCase(fetchPopularProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.popularProducts = action.payload;
            })
            .addCase(fetchPopularProducts.rejected, handleError)
});

export const popularProductsReducer = popularProducts.reducer;
