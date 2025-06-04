interface CartItem {
    product: string;
    quantity: number;
    color: string;
    price: number;
    _id: string;
}

interface CartData {
    _id: string;
    cartItems: CartItem[];
    user: string;
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
}

export interface CartResponseBody {
    status: string;
    numOfCartItems: number;
    data: CartData;
}

export interface AddToCartPayload {
    productId: string;
    color: string;
    quantity: number;
}
