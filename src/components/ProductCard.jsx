import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const {
    id,
    title = "Noise Cancelling Headphones",
    price = 299,
    image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    details = "Product Details:",
  } = product || {};

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, title, price, image });
  };

  return (
    <div className="rounded-3xl p-8 flex flex-col justify-between min-h-[340px] relative overflow-hidden group w-full transition-all duration-300 shadow-sm hover:shadow-md">

      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <div className="space-y-2 max-w-[90%] relative z-10 pointer-events-none">
        <h3 className="text-2xl font-serif tracking-tight text-white leading-tight">
          {title}
        </h3>
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
            {details}
          </p>
          <p className="text-xl font-medium text-white">
            {formatPrice(price)}
          </p>
        </div>
      </div>

      <div className="pt-8 relative z-10 flex flex-col gap-3">
        <Link
          to={`/products/${id}`}
          className="inline-flex items-center text-sm font-semibold text-white hover:text-gray-200 underline underline-offset-4"
        >
          Explore Product <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-fit bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
};
