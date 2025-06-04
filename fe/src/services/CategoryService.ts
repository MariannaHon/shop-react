import { SubcategoriesResponseBody, Subcategory } from "@/models/subcategory";
import { AllCategoriesResponseBody, Category } from "../models/category";
import { BaseApiService } from "./BaseApiService";
import { IHttpClient } from "./http/IHttpClient";

export class CategoryService extends BaseApiService {
    constructor(httpClient: IHttpClient, baseUrl: string) {
        super(httpClient, `${baseUrl}/categories`);
    }

    async getAllCategories(): Promise<Category[]> {
        const response = await this.request<AllCategoriesResponseBody>('get', '/');
        return response.categories;
    }

    async getSubcategoriesForCategory(categoryId: string): Promise<Subcategory[]> {
        const response = await this.request<SubcategoriesResponseBody>('get', `/${categoryId}/subcategories`);
        return response.subcategories;
    }
}