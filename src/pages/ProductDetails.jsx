import { Link, useParams } from "react-router-dom";
import { product } from "../data/product.js";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const productItem = product.find((p) => p.id === Number(id));

  if (!productItem) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <h1 className="text-2xl font-serif text-gray-900">Product not found</h1>
        <Link
          to="/products"
          className="inline-block text-sm font-medium underline underline-offset-4"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div className="rounded-3xl overflow-hidden bg-[#f4f4f6] aspect-square">
        <img
          src={productItem.image}
          alt={productItem.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Link
            to="/products"
            className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4"
          >
            ← Back to products
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900">
            {productItem.title}
          </h1>
          <p className="text-2xl font-medium text-gray-900">
            {formatPrice(productItem.price)}
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Premium tech gear from TechKraft. Built for performance, designed for
          everyday use.
        </p>

        <button
          type="button"
          onClick={() => addToCart(productItem)}
          className="bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
