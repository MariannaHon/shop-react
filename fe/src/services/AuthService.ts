import {
    LoginRequestBody,
    LoginResponseBody,
    RegisterRequestBody,
    RegisterResponseBody,
} from '../models/auth';
import { BaseApiService } from './BaseApiService';
import { IHttpClient } from './http/IHttpClient';

export const TOKEN_STORAGE_KEY = 'authToken';

export class AuthService extends BaseApiService {
    constructor(httpClient: IHttpClient, baseUrl: string) {
        super(httpClient, `${baseUrl}/auth`);
    }

    async login(loginRequest: LoginRequestBody): Promise<LoginResponseBody> {
        const response = await this.request<LoginResponseBody>(
            'post',
            '/login',
            loginRequest
        );

        if (response.token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        }

        return response;
    }

    async register(
        registerRequest: RegisterRequestBody
    ): Promise<RegisterResponseBody> {
        const response = await this.request<RegisterResponseBody>(
            'post',
            '/signup',
            registerRequest
        );

        if (response.token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        }

        return response;
    }

    logout() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    refresh() {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    }
}
