import { Product } from "@/models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRelatedProducts } from "./operations";

interface RelatedProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: RelatedProductsState = {
    products: [],
    loading: false,
    error: null,
}

function handleLoading(state: RelatedProductsState) {
    state.loading = true;
    state.error = null;
}

function handleError(state: RelatedProductsState, action: PayloadAction<unknown>) {
    state.loading = false;
    state.error = action.payload as string | null;
}

const relatedProductsSlice = createSlice({
    name: 'relatedProducts',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => 
        builder
            .addCase(fetchRelatedProducts.pending, handleLoading)
            .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(fetchRelatedProducts.rejected, handleError)
});

export const relatedProductsReducer = relatedProductsSlice.reducer;
