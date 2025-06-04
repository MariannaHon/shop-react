import { RegisterResponseBody } from '../models/auth';
import { BaseApiService } from './BaseApiService';
import { IHttpClient } from './http/IHttpClient';

export class UserService extends BaseApiService {
    constructor(httpClient: IHttpClient, baseUrl: string) {
        super(httpClient, `${baseUrl}/users`);
    }

    async getUser(): Promise<RegisterResponseBody> {
        return await this.request<RegisterResponseBody>('get', '/getMe');
    }
}
