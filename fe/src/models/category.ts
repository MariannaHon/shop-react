export interface Category {
    _id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
}

export interface AllCategoriesResponseBody {
    page: number;
    categories: Category[];
}
