import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios';
import { HttpClientRequestConfig, IHttpClient } from './IHttpClient';
import { TOKEN_STORAGE_KEY } from '../AuthService';

export class AxiosClient implements IHttpClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem(TOKEN_STORAGE_KEY);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );
    }

    async get<T = unknown>(
        url: string,
        config?: HttpClientRequestConfig
    ): Promise<T> {
        const response = await this.axiosInstance.get(url, config);
        return response.data;
    }

    async post<T = unknown>(
        url: string,
        data: unknown,
        config?: HttpClientRequestConfig
    ): Promise<T> {
        const response = await this.axiosInstance.post(url, data, config);
        return response.data;
    }

    async put<T = unknown>(
        url: string,
        data?: unknown,
        config?: HttpClientRequestConfig
    ): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    async delete<T = unknown>(
        url: string,
        config?: HttpClientRequestConfig
    ): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }
}
