import { RootState } from '../store';

export const selectCategoryFilter = (state: RootState) =>
    state.filters.category;
export const selectSubcategoryFilter = (state: RootState) => state.filters.subcategory;
export const selectPriceFilter = (state: RootState) => state.filters.price;
export const selectBrandFilter = (state: RootState) => state.filters.brand;
