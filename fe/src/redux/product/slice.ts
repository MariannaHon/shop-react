import { Product } from "@/models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductById } from "./operations";

interface ProductState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    product: null,
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

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => 
        builder
            .addCase(fetchProductById.pending, handleLoading)
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, handleError)
});

export const productByIdReducer = productSlice.reducer;
