import { apiRequest } from "./api";

export const getProducts = () => apiRequest("/products");

export const getProductById = (id) => apiRequest(`/products/${id}`);
