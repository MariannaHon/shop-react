export interface Product {
    _id: string;
    images: string[];
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    sold: number;
    priceAfterDiscount: number;
    colors: string[];
    category: {
        _id: string;
        name: string;
    };
    subcategories: string[];
    brand: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductsResponse {
    page: number;
    result: number;
    data: Product[];
}

export interface ProductResponse {
    data: Product;
}
