import React, { useState } from 'react';
import CheckboxFilter from '../filters/BrandsFilter/BrandsFilter';
import FilterGroup from '../filters/FilterGroup/FilterGroup';
import styles from "./FilterSidebar.module.scss";
import CategoryFilter from '../filters/CategoryFilter/CategoryFilter';
import PriceFilter from '../filters/PriceFilter/PriceFilter';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { clearAllFilters } from '@/redux/filters/slice';

const FilterSidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [resetToken, setResetToken] = useState<number>(0);

    const handleFiltersReset = () => {
        dispatch(clearAllFilters());
        setResetToken(prevToken => prevToken + 1);
    };

    return (
        <aside className={styles.sidebar}>
            <button className={styles.resetButton} onClick={handleFiltersReset}>
                Reset Filters
            </button>
            <FilterGroup title="CATEGORIES">
                <CategoryFilter key={`category-filter-${resetToken}`} />
            </FilterGroup>
             <FilterGroup title="PRICE RANGE">
                <PriceFilter key={`price-filter-${resetToken}`} />
             </FilterGroup>
             <FilterGroup title="BRAND">
                <CheckboxFilter key={`brand-filter-${resetToken}`} />
             </FilterGroup>
        </aside>
    );
}

export default FilterSidebar;
