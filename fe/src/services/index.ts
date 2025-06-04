import { AuthService } from './AuthService';
import { BrandsService } from './BrandsService';
import { CartService } from './CartService';
import { CategoryService } from './CategoryService';
import { AxiosClient } from './http/AxiosClient';
import { IHttpClient } from './http/IHttpClient';
import { ProductService } from './ProductService';
import { UserService } from './UserService';

export const apiBaseUrl = 'http://localhost:3000/api';

const httpClient: IHttpClient = new AxiosClient();

export const productService = new ProductService(httpClient, apiBaseUrl);
export const authService = new AuthService(httpClient, apiBaseUrl);
export const cartService = new CartService(httpClient, apiBaseUrl);
export const userService = new UserService(httpClient, apiBaseUrl);
export const categoryService = new CategoryService(httpClient, apiBaseUrl);
export const brandsService = new BrandsService(httpClient, apiBaseUrl);
