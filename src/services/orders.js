import { apiRequest } from "./api";

export const getOrders = () => apiRequest("/orders");

export const getOrderById = (id) => apiRequest(`/orders/${id}`);

export const checkout = () =>
  apiRequest("/orders/checkout", { method: "POST" });
