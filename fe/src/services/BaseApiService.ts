import { HttpClientRequestConfig, IHttpClient } from './http/IHttpClient';

export abstract class BaseApiService {
    protected httpClient: IHttpClient;
    protected baseUrl: string;

    constructor(httpClient: IHttpClient, baseUrl: string) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }

    protected async request<T = unknown>(
        method: 'get' | 'post' | 'put' | 'delete',
        endpoint: string = '',
        data?: unknown,
        config?: HttpClientRequestConfig
    ): Promise<T> {
        let url = `${this.baseUrl}/${endpoint}`;
        url = url.replace(/(?<!:)\/+/gm, '/'); //replaces double slashes

        try {
            switch (method) {
                case 'get':
                    return await this.httpClient.get(url, config);
                case 'post':
                    return await this.httpClient.post(url, data, config);
                case 'put':
                    return await this.httpClient.put(url, data, config);
                case 'delete':
                    return await this.httpClient.delete(url, config);
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                error.message = `Error in Base Api Service: ${error.message}`;
            }
            throw error;
        }
    }
}
