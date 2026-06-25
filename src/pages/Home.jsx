import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import drone from "../assets/drone.png";
import headphone from "../assets/headphone.png";
import iphone from "../assets/iphone.png";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../services/products";

const categories = [
  {
    id: 1,
    title: "Audio & Headphones",
    details: "Immersive sound for every moment",
    image: headphone,
  },
  {
    id: 2,
    title: "Mobile & Wearables",
    details: "Smart devices on the go",
    image: iphone,
  },
  {
    id: 3,
    title: "Drones & Cameras",
    details: "Capture from every angle",
    image: drone,
  },
  {
    id: 4,
    title: "Desk & Productivity",
    details: "Upgrade your workspace",
    image: headphone,
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "The mechanical keyboard feels premium and the delivery was faster than expected. TechKraft is my go-to for gear now.",
    name: "Arjun Mehta",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 2,
    quote:
      "Bought noise-cancelling headphones for WFH — crystal clear calls and the build quality is outstanding.",
    name: "Priya Sharma",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 3,
    quote:
      "Smooth checkout, genuine products, and helpful support. Already recommended TechKraft to my whole team.",
    name: "Rahul Verma",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

const valueProps = [
  { label: "Free shipping", detail: "On orders over ₹5,000" },
  { label: "Easy returns", detail: "30-day policy" },
  { label: "Secure checkout", detail: "Encrypted payments" },
  { label: "1-year warranty", detail: "On all products" },
];

const Hero = () => (
  <section className="mt-4 md:mt-6 mb-12 md:mb-16 bg-[#f4f4f6] rounded-2xl md:rounded-3xl px-6 py-10 md:px-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
    <div className="md:col-span-5 space-y-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
        Welcome to TechKraft
      </p>
      <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-gray-900 leading-tight">
        High-quality tech <br />
        <span className="italic">gadgets</span> &amp; accessories
      </h1>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">
        Discover curated gear for work, gaming, and everyday life — built to
        perform and designed to last.
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          to="/products"
          className="bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Browse Collection
        </Link>
        <Link
          to="/cart"
          className="border border-gray-400 text-black text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
        >
          View Cart
        </Link>
      </div>
    </div>

    <div className="md:col-span-7 rounded-2xl md:rounded-3xl overflow-hidden min-h-[240px] md:min-h-[360px] relative">
      <img
        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80"
        alt="Tech gadgets showcase"
        className="w-full h-full object-cover md:object-contain md:h-[360px] md:translate-y-4"
      />
    </div>
  </section>
);

const ValueProps = () => (
  <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14 md:mb-16">
    {valueProps.map((item) => (
      <div
        key={item.label}
        className="border border-gray-200 rounded-2xl px-5 py-4 md:px-6 md:py-5 space-y-1"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-900">
          {item.label}
        </p>
        <p className="text-sm text-gray-500">{item.detail}</p>
      </div>
    ))}
  </section>
);

const ProductCategories = () => (
  <section className="mb-14 md:mb-20">
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Shop by category
        </p>
        <h2 className="text-3xl font-serif text-gray-900">
          Find your next upgrade
        </h2>
      </div>
      <Link
        to="/products"
        className="text-sm font-medium text-gray-900 hover:underline underline-offset-4 w-fit"
      >
        View all products →
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-[#f4f4f6] rounded-3xl p-8 flex flex-col justify-between min-h-[300px] md:min-h-[320px] relative overflow-hidden group"
        >
          <div className="space-y-2 max-w-[60%] relative z-10">
            <h3 className="text-2xl font-serif tracking-tight text-gray-900">
              {category.title}
            </h3>
            <p className="text-sm font-medium text-gray-600">
              {category.details}
            </p>
          </div>

          <div className="pt-8 relative z-10">
            <Link
              to="/products"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline group-hover:underline"
            >
              Explore Category{" "}
              <span className="ml-1 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 md:h-3/5 flex items-end justify-end pointer-events-none">
            <img
              src={category.image}
              alt={category.title}
              className="object-contain max-h-full max-w-full transform translate-x-4 translate-y-4 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setFeaturedProducts(data.slice(0, 3)))
      .catch(() => setFeaturedProducts([]));
  }, []);

  return (
    <section className="mb-14 md:mb-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Best sellers
          </p>
          <h2 className="text-3xl font-serif text-gray-900">Featured products</h2>
        </div>
        <Link
          to="/products"
          className="border border-gray-400 text-black text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors w-fit"
        >
          Shop all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {featuredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  const goTo = (direction) => {
    setActiveIndex(
      (prev) =>
        (prev + direction + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="mb-14 md:mb-20 text-center">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
        Customer stories
      </p>
      <h2 className="text-3xl font-serif text-gray-900 mb-10 md:mb-12">
        What our customers are saying
      </h2>

      <div className="flex items-center justify-center gap-4 md:gap-6">
        <button
          type="button"
          onClick={() => goTo(-1)}
          className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <div className="bg-[#f4f4f6] rounded-3xl p-6 md:p-12 max-w-3xl w-full flex flex-col md:flex-row gap-6 md:gap-8 items-center text-left">
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-200">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>

          <div className="flex flex-col justify-between min-h-[160px] md:min-h-[192px] w-full py-1 md:py-2">
            <div className="space-y-4">
              <span className="inline-block transform rotate-45 text-xl font-light text-gray-800">
                ↑
              </span>
              <p className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-gray-900">
                {current.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{current.role}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(1)}
          className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors shrink-0"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? "w-6 bg-black"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

const TrustStrip = () => (
  <section className="bg-[#f4f4f6] rounded-2xl md:rounded-3xl px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-serif text-gray-900">
        Ready to upgrade your setup?
      </h2>
      <p className="text-sm text-gray-600">
        Browse the full collection and add your favorites to cart.
      </p>
    </div>
    <Link
      to="/products"
      className="bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors w-fit"
    >
      Start Shopping
    </Link>
  </section>
);

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-8">
      <Hero />
      <ValueProps />
      <ProductCategories />
      <FeaturedProducts />
      <Testimonial />
      <TrustStrip />
    </div>
  );
};
