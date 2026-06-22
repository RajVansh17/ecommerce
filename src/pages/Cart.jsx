import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export const Cart = () => {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-6">
        <h1 className="text-3xl font-serif text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500">
          Browse our products and add something you like.
        </p>
        <Link
          to="/products"
          className="inline-block bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-gray-900">Shopping Cart</h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4"
        >
          Clear cart
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 md:gap-6 p-4 md:p-6 bg-[#f4f4f6] rounded-2xl items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shrink-0"
            />

            <div className="flex-grow min-w-0 space-y-1">
              <Link
                to={`/products/${item.id}`}
                className="text-lg font-medium text-gray-900 hover:underline truncate block"
              >
                {item.title}
              </Link>
              <p className="text-gray-600">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-white transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-white transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="text-right shrink-0 space-y-2">
              <p className="font-medium text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-xs text-gray-500 hover:text-red-600 underline underline-offset-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-serif text-gray-900">
            {formatPrice(cartTotal)}
          </p>
        </div>
        <button
          type="button"
          className="bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
