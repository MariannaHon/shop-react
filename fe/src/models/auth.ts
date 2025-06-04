export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface RegisterRequestBody {
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

interface LoginResponseData {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin';
    active: boolean;
    wishlist: string[];
    addresses: string[];
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
}

interface RegisterResponseData extends LoginResponseData {
    password: string;
}

export interface LoginResponseBody {
    data: LoginResponseData;
    token: string;
}

export interface RegisterResponseBody {
    data: RegisterResponseData;
    token: string;
}
