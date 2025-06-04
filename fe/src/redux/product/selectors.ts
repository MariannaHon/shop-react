import { RootState } from "../store";

export const selectProductById = (state: RootState) => state.productById.product;
export const selectProductLoading = (state: RootState) => state.productById.loading;