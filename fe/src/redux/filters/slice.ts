import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filters {
    category: string | null;
    subcategory: string | null;
    price: [number, number] | null;
    brand: string[];
}

const filtersInitialState: Filters = {
    category: null,
    subcategory: null,
    price: null,
    brand: [],
};

type ChangeFilterActionPayload =
  | { filter: 'category'; value: string | null }
  | { filter: 'subcategory'; value: string | null }
  | { filter: 'price'; value: [number, number] | null }
  | { filter: 'brand'; value: string[] };

const filtersSlice = createSlice({
    name: 'filters',
    initialState: filtersInitialState,
    reducers: {
        changeFilter(state, action: PayloadAction<ChangeFilterActionPayload>) {
            switch (action.payload.filter) {
                case 'category':
                    state.category = action.payload.value;
                    state.subcategory = null;
                    break;
                case 'subcategory':
                    state.subcategory = action.payload.value;
                    state.category = null;
                    break;
                case 'price':
                    state.price = action.payload.value;
                    break;
                case 'brand':
                    state.brand = action.payload.value;
                    break;
            }
        },
        clearAllFilters(state) {
            state.category = filtersInitialState.category;
            state.subcategory = filtersInitialState.subcategory;
            state.price = filtersInitialState.price;
            state.brand = filtersInitialState.brand;
        }
    },
});

export const { changeFilter, clearAllFilters } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
