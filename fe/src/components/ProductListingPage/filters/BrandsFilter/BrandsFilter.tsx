import React, { useEffect, useState } from 'react';

import styles from './BrandsFilter.module.scss';
import { brandsService } from '@/services';
import { Brand } from '@/models/brand';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { changeFilter } from '@/redux/filters/slice';

const BrandsFilter = () => {
    const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set([]));
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchBrands = async () => {
            setIsLoading(true);

            try {
                const brands = await brandsService.getBrands();
                setBrands(brands);
            } catch (err) {
                console.error("Failed to fetch brands data:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBrands();
    }, []);

    const handleCheckboxChange = (brandId: string) => {
        const newSelectedBrands = new Set(selectedBrands);
        if (newSelectedBrands.has(brandId)) {
            newSelectedBrands.delete(brandId);
        } else {
            newSelectedBrands.add(brandId);
        }

        setSelectedBrands(newSelectedBrands);

        dispatch(changeFilter({ filter: 'brand', value: [...newSelectedBrands]}));
    };

    if (isLoading) return <div>Loading</div>

    return (
        <ul className={styles.checkboxFilterList}>
            {brands.map((brand, index) => {
                const isChecked = selectedBrands.has(brand._id);
                const checkboxId = `item-${index}`;

                return (
                    <li key={brand.name} className={styles.filterItem}>
                    <input
                        type="checkbox"
                        id={checkboxId}
                        value={brand._id}
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(brand._id)}
                        className={styles.checkboxInput}
                    />
                    <label htmlFor={checkboxId} className={styles.checkboxLabel}>
                        <span className={styles.labelText}>{brand.name}</span>
                    </label>
                    </li>
                );
            })}
        </ul>
    );
};

export default BrandsFilter;