export interface HttpClientRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    data?: unknown;
}

export interface IHttpClient {
    get<T>(url: string, config?: HttpClientRequestConfig): Promise<T>;
    post<T>(
        url: string,
        data?: unknown,
        config?: HttpClientRequestConfig
    ): Promise<T>;
    put<T>(
        url: string,
        data?: unknown,
        config?: HttpClientRequestConfig
    ): Promise<T>;
    delete<T>(url: string, config?: HttpClientRequestConfig): Promise<T>;
}
