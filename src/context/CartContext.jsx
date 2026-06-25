import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import * as cartService from "../services/cart";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const cartItems = await cartService.getCart();
      setItems(cartItems);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      loadCart();
    }
  }, [authLoading, loadCart]);

  const requireAuth = () => {
    if (!isAuthenticated) {
      throw new Error("Please sign in to manage your cart");
    }
  };

  const addToCart = async (product, quantity = 1) => {
    requireAuth();
    const cartItems = await cartService.addCartItem(product.id, quantity);
    setItems(cartItems);
  };

  const removeFromCart = async (productId) => {
    requireAuth();
    const cartItems = await cartService.removeCartItem(productId);
    setItems(cartItems);
  };

  const updateQuantity = async (productId, quantity) => {
    requireAuth();
    const cartItems = await cartService.updateCartItem(productId, quantity);
    setItems(cartItems);
  };

  const clearCart = async () => {
    requireAuth();
    await cartService.clearCartApi();
    setItems([]);
  };

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = {
    items,
    cartCount,
    cartTotal,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart: loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
