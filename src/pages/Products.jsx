import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { product as products } from "../data/product.js";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A–Z" },
];

export const Products = () => {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return list;
    }
  }, [sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-8">
      {/* Page header */}
      <section className="bg-[#f4f4f6] rounded-2xl md:rounded-3xl px-6 py-10 md:px-12 md:py-14 mb-10 md:mb-14">
        <div className="max-w-2xl space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            TechKraft Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-gray-900 leading-tight">
            Curated tech <span className="italic">gadgets</span> &amp; accessories
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-lg">
            Hand-picked gear for work, play, and everything in between. Quality
            you can trust, designs you&apos;ll love.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">{sortedProducts.length}</span>{" "}
          products
        </p>

        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSort(option.value)}
              className={`text-xs font-medium px-5 py-2.5 rounded-full transition-colors ${
                sort === option.value
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border border-gray-400 text-gray-900 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section
        aria-label="Product listing"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
      >
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </section>

      {/* Bottom strip */}
      <section className="mt-14 md:mt-20 bg-[#f4f4f6] rounded-2xl md:rounded-3xl px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-gray-900">
            Free shipping on orders over ₹5,000
          </h2>
          <p className="text-sm text-gray-600">
            Fast delivery across India. Easy returns within 30 days.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <span>Secure checkout</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>1-year warranty</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>24/7 support</span>
        </div>
      </section>
    </div>
  );
};
