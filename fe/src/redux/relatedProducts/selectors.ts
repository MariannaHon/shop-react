import { RootState } from "../store";

export const selectRelatedProducts = (state: RootState) => state.relatedProducts.products;
export const selectRelatedLoading = (state: RootState) => state.relatedProducts.loading;