import { RootState } from '../store';
import {
    selectCategoryFilter,
    selectBrandFilter,
    selectPriceFilter,
    selectSubcategoryFilter,
} from '../filters/selectors';

import { Product } from '@/models/product';

import { createSelector } from '@reduxjs/toolkit';

export const selectError = (state: RootState) => state.products.error;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectProducts = (state: RootState) => state.products.items;
export const selectPage = (state: RootState) => state.products.page;
export const selectLimit = (state: RootState) => state.products.limit;
export const selectOrder = (state: RootState) => state.products.order;
export const selectView = (state: RootState) => state.products.view;

export const selectFilteredAndSortedProducts = createSelector(
    [
        selectProducts,
        selectBrandFilter,
        selectCategoryFilter,
        selectSubcategoryFilter,
        selectPriceFilter,
        selectOrder,
    ],
    function (products, brand, category, subcategory, price, order) {
        if (!Array.isArray(products)) {
            return [];
        }

        let result: Product[] = products;

        if (brand) {
            result = filterBrand(result, brand);
        }
        if (category) {
            result = filterCategory(result, category);
        }
        if (subcategory) {
            result = filterSubcategory(result, subcategory);
        }
        if (price) {
            result = filterPrice(result, price);
        }

        let sortedProducts: Product[] = result;
        switch (order) {
            case 'alphabetical':
                sortedProducts = sortByName(result);
                break;
            case 'low-high':
                sortedProducts = sortByPriceLowToHigh(result);
                break;
            case 'high-low':
                sortedProducts = sortByPriceHighToLow(result);
                break;
            default:
                break;
        }
        return sortedProducts;
    }
);

function filterBrand(products: Product[], value: string[]): Product[] {
    if (value.length === 0) return products;

    const filtered = products.filter(product => 
        value.includes(product.brand)
    );

    return filtered;
}

function filterCategory(products: Product[], value: string): Product[] {
    if (!value) return products;
    return products.filter(product => product.category._id === value);
}

function filterSubcategory(products: Product[], value: string): Product[] {
    if (!value) return products;
    return products.filter(product => product.subcategories.includes(value));
}

function filterPrice(products: Product[], value: [number, number]): Product[] {
    if (!value) return products;

    const filtered = products.filter(product => product.price >= value[0] && product.price <= value[1])
    return filtered;
}

function sortByName(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
}

function sortByPriceLowToHigh(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
}

function sortByPriceHighToLow(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.price - a.price);
}

export const selectPaginatedProducts = createSelector(
    [
        selectFilteredAndSortedProducts,
        selectPage,
        selectLimit
    ],
    (filteredAndSortedProducts, currentPage, limit) => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }
);

export const selectTotalPages = createSelector(
    [
        selectFilteredAndSortedProducts,
        selectLimit
    ],
    (filteredAndSortedProducts, selectedLimit) => {
        const numberOfPages = Math.ceil(filteredAndSortedProducts.length / selectedLimit);
        const pagesArray = Array.from({ length: numberOfPages }, (_, i) => i + 1);
        return pagesArray;
    }
);

export const selectOverallPriceRange = createSelector(
    [selectProducts],
    (allProducts) => {
        if (!Array.isArray(allProducts) || allProducts.length === 0) {
            return { min: 0, max: 0 };
        }

        let minPrice = allProducts[0].price;
        let maxPrice = allProducts[0].price;

        for (const product of allProducts) {
            if (product.price < minPrice) {
                minPrice = product.price;
            }
            if (product.price > maxPrice) {
                maxPrice = product.price;
            }
        }
        return { min: minPrice, max: maxPrice };
    }
);
