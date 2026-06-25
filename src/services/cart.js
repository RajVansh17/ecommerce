import { apiRequest } from "./api";

export const getCart = () => apiRequest("/cart");

export const addCartItem = (productId, quantity = 1) =>
  apiRequest("/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

export const updateCartItem = (productId, quantity) =>
  apiRequest(`/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

export const removeCartItem = (productId) =>
  apiRequest(`/cart/items/${productId}`, { method: "DELETE" });

export const clearCartApi = () =>
  apiRequest("/cart", { method: "DELETE" });
