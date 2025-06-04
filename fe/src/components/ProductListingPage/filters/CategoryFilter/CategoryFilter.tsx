import { useEffect, useState } from "react";
import styles from "./CategoryFilter.module.scss";
import { categoryService } from "@/services";
import { Subcategory } from "@/models/subcategory";
import { Category } from "@/models/category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeFilter } from "@/redux/filters/slice";

interface SidebarFilterCategory {
    category: Category;
    subcategories: Subcategory[];
}

const CategoryFilter = () => {
    const [categoriesData, setCategoriesData] = useState<SidebarFilterCategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const mainCategories: Category[] = await categoryService.getAllCategories();

                if (!mainCategories || mainCategories.length === 0) {
                    setCategoriesData([]);
                    setIsLoading(false);
                    return;
                }

                const populatedCategories = await Promise.all(
                    mainCategories.map(async (category) => {
                        try {
                            const subcategories: Subcategory[] = await categoryService.getSubcategoriesForCategory(category._id);
                            return {
                                category: category,
                                subcategories: subcategories || [],
                            };
                        } catch (subError) {
                            console.error(`Failed to fetch subcategories for category ${category._id}:`, subError);

                            return {
                                category: category,
                                subcategories: [],
                            };
                        }
                    })
                );

                setCategoriesData(populatedCategories);
            } catch (err) {
                console.error("Failed to fetch categories data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleCategoryChange = (selectedCategory: Category) => {
        setSelectedCategory(selectedCategory.name)
        dispatch(changeFilter({filter: 'category', value: selectedCategory._id}));
    }

    const handleSubcategoryChange = (selectedSubcategory: Subcategory) => {
        setSelectedCategory(selectedSubcategory.name)
        dispatch(changeFilter({filter: 'subcategory', value: selectedSubcategory._id}));
    }

    if (isLoading) return <p>Loading categories</p>;

    return (
        <>
            {categoriesData.map(categoryData => (
                <div className={styles.categoryGroup} key={categoryData.category._id}>
                    <p
                        className={`${styles.categoryName} ${categoryData.category.name === selectedCategory ? styles.activeCategoryName : ''}`}
                        onClick={() => handleCategoryChange(categoryData.category)}
                    >
                        {categoryData.category.name}
                    </p>
                    <ul className={styles.subcategoryGroup}>
                        {categoryData.subcategories.map(subcategory => (
                            <li
                                className={`${styles.subcategoryName} ${subcategory.name === selectedCategory ? styles.activeSubcategoryName : ''}`}
                                onClick={() => handleSubcategoryChange(subcategory)}
                                key={subcategory._id}
                            >
                                {subcategory.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}

export default CategoryFilter;