import { Brand, BrandResponseBody } from '@/models/brand';
import { BaseApiService } from './BaseApiService';
import { IHttpClient } from './http/IHttpClient';

export class BrandsService extends BaseApiService {
    constructor(httpClient: IHttpClient, baseUrl: string) {
        super(httpClient, `${baseUrl}/brands`);
    }

    async getBrands(): Promise<Brand[]> {
        const response = await this.request<BrandResponseBody>('get', '/');
        return response.data;
    }
}