import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartResponseBody } from '@/models/cart';
import { addToCart, getCart, updateCart, removeItem } from './operations';

interface CartState {
    cart: CartResponseBody | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart(state) {
            state.cart = null;
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCart.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getCart.fulfilled,
                (state, action: PayloadAction<CartResponseBody>) => {
                    state.loading = false;
                    state.cart = action.payload;
                }
            )
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addToCart.pending, state => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                addToCart.fulfilled,
                (state, action: PayloadAction<CartResponseBody>) => {
                    state.cart = action.payload;
                }
            )

            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

            .addCase(updateCart.pending, state => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                updateCart.fulfilled,
                (state, action: PayloadAction<CartResponseBody>) => {
                    state.cart = action.payload;
                }
            )

            .addCase(updateCart.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

            .addCase(
                removeItem.fulfilled,
                (state, action: PayloadAction<CartResponseBody>) => {
                    state.cart = action.payload;
                }
            );
    },
});

export const { clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
