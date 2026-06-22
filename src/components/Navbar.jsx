import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-15 shadow-sm">
      <Link to="/"><span className="font-sans bg-black text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">TechKraft</span></Link>


      <div className="px-10 w-80 mr-10 flex justify-between gap-2">
        <Link to="/" className="border border-gray-400  text-black text-md font-large px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">Home</Link>
        <Link to="/products" className="border border-gray-400  text-black text-md font-large px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">Product</Link>
        <Link to="/cart" className=" border border-gray-400 text-black text-md font-large px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">Cart</Link>
      </div>

      <div className="font-sans bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
        <Link to="/profile">Profile</Link>
      </div>

    </nav>
  );
};

export default Navbar;

// className="border border-gray-400 text-black text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"