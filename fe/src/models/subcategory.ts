export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface SubcategoriesResponseBody {
    page: number;
    subcategories: Subcategory[];
}