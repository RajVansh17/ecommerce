import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/formatPrice";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/products/${id}` } });
      return;
    }

    setAdding(true);
    try {
      await addToCart(product);
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
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
          src={product.image}
          alt={product.title}
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
            {product.title}
          </h1>
          <p className="text-2xl font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Premium tech gear from TechKraft. Built for performance, designed for
          everyday use.
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={adding}
          className="bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
