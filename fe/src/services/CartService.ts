import { AddToCartPayload, CartResponseBody } from '../models/cart';
import { BaseApiService } from './BaseApiService';
import { IHttpClient } from './http/IHttpClient';

export class CartService extends BaseApiService {
    constructor(httpClient: IHttpClient, baseUrl: string) {
        super(httpClient, `${baseUrl}/cart`);
    }

    async getCart(): Promise<CartResponseBody> {
        return await this.request<CartResponseBody>('get', '/');
    }

    async addToCart(itemData: AddToCartPayload): Promise<CartResponseBody> {
        return await this.request<CartResponseBody>('post', '/', itemData);
    }

    async updateCartItem(itemId: string, quantityData: {quantity: number}): Promise<CartResponseBody> {
        return await this.request<CartResponseBody>('put', `/${itemId}`, quantityData);
    }

    async removeCartItem(itemId: string): Promise<CartResponseBody> {
        return await this.request<CartResponseBody>('delete', `/${itemId}`);
    }
}