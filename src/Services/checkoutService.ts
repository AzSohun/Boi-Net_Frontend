import { axiosClient } from "../Api/axiosClient";
import type { CreateOrderDto, OrderResponse, PaymentIntentResponse, PurchasedBook } from "../types/checkout";


export const CheckoutService = {
    createOrder: async (data: CreateOrderDto): Promise<OrderResponse> => {
        const response = await axiosClient.post<OrderResponse>('/Order/place-order', data);
        return response.data;
    },

    getPaymentIntent: async (orderId: number): Promise<PaymentIntentResponse> => {
        const response = await axiosClient.post<PaymentIntentResponse>(`/payment/create-payment-intent/${orderId}`);
        return response.data;
    },

    getMyPurchasedBooks: async (): Promise<PurchasedBook[]> => {
        const response = await axiosClient.get<PurchasedBook[]>('/Order/my-books');
        return response.data;
    }
};