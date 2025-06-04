import { RootState } from "../store";

export const selectPopularProducts = (state: RootState) => state.popularProducts.popularProducts;
export const selectPopularLoading = (state: RootState) => state.popularProducts.loading;