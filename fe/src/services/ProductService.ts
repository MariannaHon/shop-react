import { Product, ProductResponse, ProductsResponse } from '../models/product';
import { BaseApiService } from './BaseApiService';
import { HttpClientRequestConfig, IHttpClient } from './http/IHttpClient';

interface ProductParams {
    page?: number;
    limit?: number;
    sortedBy?: string;
    keyword?: string;
    fields?: string;
    [key: string]: string | number | undefined;
}

export class ProductService extends BaseApiService {
    constructor(httpClient: IHttpClient, baseUrl: string) {
        super(httpClient, `${baseUrl}/products`);
    }

    async getProducts(queryParams?: ProductParams): Promise<Product[]> {
        const config: HttpClientRequestConfig = { params: queryParams };

        const response = await this.request<ProductsResponse>(
            'get',
            '/',
            undefined,
            config
        );
        return response.data;
    }

    //param limited all products request to mock popular products as there is no dedicated endpoint for them
    async getPopularProducts(limit: number = 4): Promise<Product[]> {
        const response = await this.getProducts({ limit: limit });
        return response;
    }

    async getSingleProduct(productId: string): Promise<Product> {
        const response = await this.request<ProductResponse>('get', `/${productId}`);
        return response.data;
    }

    async getRelatedProducts(productId: string): Promise<Product[]> {
        const response = await this.request<Product[]>('get', `/related/${productId}`);
        return response;
    }
}
