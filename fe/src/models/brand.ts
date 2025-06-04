export interface Brand {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BrandResponseBody {
    page: number;
    result: number;
    data: Brand[]
}