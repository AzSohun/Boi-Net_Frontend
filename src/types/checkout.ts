export interface OrderItemDto {
    BookId: number;
    Quantity: number;
}

export interface CreateOrderDto {
    OrderItems: OrderItemDto[];
}

export interface OrderResponse {
    message?: string;
    orderid?: number;
    orderId?: number;
    OrderId?: number;
    id?: number;
    Id?: number;
    totalAmount?: number;
}

export interface PaymentIntentResponse {
    clientSecret: string;
}


export interface PurchasedBook {
    bookId: number;
    title: string;
    author: string;
    coverPhoto: string;
}