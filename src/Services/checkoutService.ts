import { axiosClient } from "../Api/axiosClient";
import type { CreateOrderDto, OrderResponse, PaymentIntentResponse } from "../types/checkout";


export const CheckoutService = {
    createOrder: async (data: CreateOrderDto): Promise<OrderResponse> => {
        // এখানেই ছিল আসল ভুলটা! এখন ঠিক রাউট বসানো হয়েছে:
        const response = await axiosClient.post<OrderResponse>('/Order/place-order', data);
        return response.data;
    },

    getPaymentIntent: async (orderId: number): Promise<PaymentIntentResponse> => {
        const response = await axiosClient.post<PaymentIntentResponse>(`/payment/create-payment-intent/${orderId}`);
        return response.data;
    }
};