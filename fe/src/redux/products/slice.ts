import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './operations';
import { Product } from '../../models/product';

export type OrderType = 'high-low' | 'low-high' | 'alphabetical' | null;

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    page: number;
    limit: number;
    order: OrderType
    view: 'grid' | 'list';
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    limit: 5,
    order: 'alphabetical',
    view: 'list',
};

function handleLoading(state: ProductsState) {
    state.loading = true;
    state.error = null;
}

function handleError(state: ProductsState, action: PayloadAction<unknown>) {
    state.loading = false;
    state.error = action.payload as string | null;
}

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        changePage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        changeLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        changeSortOrder(
            state,
            action: PayloadAction<OrderType>
        ) {
            state.order = action.payload;
        },
        changeViewMode(state, action: PayloadAction<'grid' | 'list'>) {
            state.view = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchProducts.pending, handleLoading)
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;

                if (Array.isArray(action.payload)) {
                    state.items = action.payload;
                } else {
                    state.items = [];
                    state.error = 'The received data is not an array.';
                }
            })
            .addCase(fetchProducts.rejected, handleError)
            .addMatcher((action: PayloadAction) => action.type.startsWith('filters/'),
                (state) => {
                    state.page = 1;
                }
            ),
});

export const productsReducer = productsSlice.reducer;
export const { changePage, changeLimit, changeSortOrder, changeViewMode } =
    productsSlice.actions;
