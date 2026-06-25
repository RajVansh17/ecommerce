import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/formatPrice";
import { getOrders } from "../services/orders";

const statusStyles = {
  Delivered: "bg-green-100 text-green-800",
  Shipped: "bg-blue-100 text-blue-800",
  Processing: "bg-amber-100 text-amber-800",
};

const ProfileField = ({ label, id, value, onChange, type = "text", disabled }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-default"
    />
  </div>
);

export const Profile = () => {
  const { cartCount, cartTotal } = useCart();
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState(user);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) setProfile(user);
  }, [user]);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
  const initials = `${profile?.firstName?.[0] || ""}${profile?.lastName?.[0] || ""}`.toUpperCase();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode,
      });
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setProfile(user);
    setIsEditing(false);
    setSaved(false);
    setError("");
  };

  if (!profile) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 pb-8 space-y-10 md:space-y-12">
      <section className="bg-[#f4f4f6] rounded-2xl md:rounded-3xl px-6 py-10 md:px-12 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black text-white flex items-center justify-center text-2xl md:text-3xl font-serif shrink-0">
            {initials}
          </div>

          <div className="grow space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              My Account
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900">{fullName}</h1>
            <p className="text-sm text-gray-600">{profile.email}</p>
            <p className="text-xs text-gray-500">Member since {memberSince}</p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="shrink-0 bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors w-fit"
            >
              Edit profile
            </button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Cart items", value: cartCount },
          { label: "Cart total", value: formatPrice(cartTotal) },
          { label: "Orders", value: orders.length },
          { label: "Wishlist", value: 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-gray-200 rounded-2xl px-5 py-4 md:px-6 md:py-5 space-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {stat.label}
            </p>
            <p className="text-xl md:text-2xl font-serif text-gray-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
        <section className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif text-gray-900">Personal information</h2>
            {saved && (
              <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                Saved successfully
              </span>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
          )}

          <form
            onSubmit={handleSave}
            className="bg-[#f4f4f6] rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfileField
                label="First name"
                id="firstName"
                value={profile.firstName}
                onChange={handleChange("firstName")}
                disabled={!isEditing}
              />
              <ProfileField
                label="Last name"
                id="lastName"
                value={profile.lastName}
                onChange={handleChange("lastName")}
                disabled={!isEditing}
              />
            </div>

            <ProfileField
              label="Email"
              id="email"
              type="email"
              value={profile.email}
              onChange={handleChange("email")}
              disabled
            />

            <ProfileField
              label="Phone"
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={handleChange("phone")}
              disabled={!isEditing}
            />

            <div className="pt-2 border-t border-gray-200/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                Shipping address
              </p>
              <div className="space-y-5">
                <ProfileField
                  label="Street address"
                  id="address"
                  value={profile.address}
                  onChange={handleChange("address")}
                  disabled={!isEditing}
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <ProfileField
                    label="City"
                    id="city"
                    value={profile.city}
                    onChange={handleChange("city")}
                    disabled={!isEditing}
                  />
                  <ProfileField
                    label="State"
                    id="state"
                    value={profile.state}
                    onChange={handleChange("state")}
                    disabled={!isEditing}
                  />
                  <ProfileField
                    label="Pincode"
                    id="pincode"
                    value={profile.pincode}
                    onChange={handleChange("pincode")}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border border-gray-400 text-gray-900 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Discard
                </button>
              </div>
            )}
          </form>
        </section>

        <aside className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-gray-900">Quick actions</h2>
            <div className="bg-[#f4f4f6] rounded-2xl md:rounded-3xl p-6 space-y-3">
              {[
                { to: "/cart", label: "View cart", detail: `${cartCount} items` },
                { to: "/products", label: "Browse products", detail: "Shop the collection" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-sm transition-shadow group"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:underline">
                      {link.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{link.detail}</p>
                  </div>
                  <span className="text-gray-400 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Purchase history
            </p>
            <h2 className="text-2xl font-serif text-gray-900">Recent orders</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-gray-900 hover:underline underline-offset-4 w-fit"
          >
            Order again →
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet. Checkout from your cart to place one.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="bg-[#f4f4f6] rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        statusStyles[order.status] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{order.date}</p>
                  <p className="text-sm text-gray-600">
                    {order.items.map((item) => `${item.name} × ${item.qty}`).join(", ")}
                  </p>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <p className="text-lg font-serif text-gray-900">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
