import { apiRequest } from "./api";

export const login = (email, password) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (firstName, lastName, email, password) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

export const getMe = () => apiRequest("/auth/me");

export const updateProfile = (data) =>
  apiRequest("/auth/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
