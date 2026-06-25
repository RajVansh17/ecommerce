import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close menu on logout
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative py-4 px-6 md:px-12 shadow-sm bg-white z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <span className="font-sans bg-black text-white text-lg font-medium px-6 py-2.0 md:px-8 md:py-3 rounded-full hover:bg-gray-800 transition-colors">
            TechKraft
          </span>
        </Link>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          onClick={toggleMenu}
          type="button"
          className="md:hidden p-2 text-black focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="border border-gray-400 text-black text-md px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">Home</Link>
          <Link to="/products" className="border border-gray-400 text-black text-md px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">Product</Link>
          <Link to="/cart" className="relative border border-gray-400 text-black text-md px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Auth Buttons (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="font-sans border border-gray-400 text-black text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
              >
                {user?.firstName || "Profile"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="font-sans bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="font-sans bg-black text-white text-sm font-medium px-8 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-3 transition-all duration-300 ease-in-out">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center border border-gray-400 text-black text-md py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center border border-gray-400 text-black text-md py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Product
          </Link>
          <Link 
            to="/cart" 
            onClick={() => setIsOpen(false)}
            className="relative w-full text-center border border-gray-400 text-black text-md py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute top-3 right-6 bg-black text-white text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          
          <hr className="border-gray-200 my-1" />

          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="font-sans text-center border border-gray-400 text-black text-sm font-medium py-3 rounded-full hover:bg-gray-50 transition-colors"
              >
                {user?.firstName || "Profile"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="font-sans w-full bg-black text-white text-sm font-medium py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="font-sans text-center bg-black text-white text-sm font-medium py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;