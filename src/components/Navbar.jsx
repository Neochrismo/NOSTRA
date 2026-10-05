// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishListContext";
// import products from "../data/product";

// export default function Navbar() {
//   const { user, logout, isAuthenticated } = useAuth();

//   const [search, setSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const { cartItems } = useCart();
//   const { wishlistCount } = useWishlist();

//   const totalCartCount = cartItems.reduce(
//     (total, item) => total + (item.quantity || 1),
//     0
//   );

//   const searchResults =
//     search.trim() === ""
//       ? []
//       : products
//           .filter(
//             (product) =>
//               product.name.toLowerCase().includes(search.toLowerCase()) ||
//               product.category?.toLowerCase().includes(search.toLowerCase())
//           )
//           .slice(0, 5);

//   const handleSelectProduct = (productId) => {
//     setSearch("");
//     setShowResults(false);
//     setIsOpen(false);
//     navigate(`/products/${productId}`);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setUserMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="bg-white shadow-md px-3 sm:px-6 py-3 sticky top-0 z-30">
//       <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
//         {/* Logo */}
//         <Link to="/" className="text-lg sm:text-xl font-bold text-green-700 shrink-0">
//           Logo
//         </Link>

//         {/* Search Bar: Desktop & Tablet */}
//         <div className="hidden md:block relative flex-1 max-w-md mx-4">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setShowResults(true);
//             }}
//             onFocus={() => setShowResults(true)}
//             className="w-full border border-gray-300 placeholder:text-gray-500 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
//           />

//           {showResults && searchResults.length > 0 && (
//             <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
//               {searchResults.map((product) => (
//                 <button
//                   key={product.id}
//                   onClick={() => handleSelectProduct(product.id)}
//                   className="w-full text-left px-4 py-2 hover:bg-green-50 flex items-center gap-3 transition text-sm text-gray-700 cursor-pointer"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-8 h-8 object-cover rounded"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-900">{product.name}</p>
//                     <p className="text-xs text-gray-500">₦{product.price}</p>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Desktop Navigation Links */}
//         <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 font-medium">
//           <Link
//             to="/wishlist"
//             className="relative flex items-center gap-1 hover:text-green-600 transition py-1 px-1.5"
//           >
//             <svg
//               className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-red-500 transition"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
//               />
//             </svg>
//             <span className="text-xs lg:text-sm">Wishlist</span>
//             {wishlistCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
//                 {wishlistCount}
//               </span>
//             )}
//           </Link>

//           <Link
//             to="/cart"
//             className="relative flex items-center gap-1 hover:text-green-600 transition py-1 px-1.5"
//           >
//             <svg
//               className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-green-600 transition"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
//               />
//             </svg>
//             <span className="text-xs lg:text-sm">Cart</span>
//             {totalCartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
//                 {totalCartCount}
//               </span>
//             )}
//           </Link>

//           <Link to="/about" className="text-xs lg:text-sm hover:text-green-600 transition">
//             About
//           </Link>
//           <Link to="/contact" className="text-xs lg:text-sm hover:text-green-600 transition">
//             Contact
//           </Link>

//           {/* Desktop User Account Menu */}
//           {isAuthenticated ? (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setUserMenuOpen(!userMenuOpen)}
//                 className="flex items-center gap-2 focus:outline-none cursor-pointer bg-green-50 py-1 px-3 rounded-full border border-green-200 hover:bg-green-100 transition"
//               >
//                 <div className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-xs">
//                   {user?.avatar ? (
//                     <img
//                       src={user.avatar}
//                       alt={user.name}
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     user?.name?.charAt(0).toUpperCase() || "U"
//                   )}
//                 </div>
//                 <span className="text-xs lg:text-sm font-semibold text-gray-800">
//                   {user?.name?.split(" ")[0]}
//                 </span>
//                 <svg
//                   className={`w-3.5 h-3.5 text-gray-600 transition-transform ${
//                     userMenuOpen ? "rotate-180" : ""
//                   }`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>

//               {userMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
//                   <div className="px-4 py-2 border-b border-gray-100">
//                     <p className="text-xs text-gray-400">Signed in as</p>
//                     <p className="text-xs font-semibold text-gray-800 truncate">
//                       {user?.email}
//                     </p>
//                   </div>
//                   <Link
//                     to="/orders"
//                     onClick={() => setUserMenuOpen(false)}
//                     className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 transition"
//                   >
//                     📦 My Orders
//                   </Link>
//                   <Link
//                     to="/profile"
//                     onClick={() => setUserMenuOpen(false)}
//                     className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 transition"
//                   >
//                     👤 Profile Settings
//                   </Link>
//                   <hr className="my-1 border-gray-100" />
//                   <button
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       logout();
//                     }}
//                     className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition cursor-pointer"
//                   >
//                     🚪 Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               className="bg-green-600 text-white text-xs lg:text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
//             >
//               Sign In
//             </Link>
//           )}
//         </div>

//         {/* Mobile Top Bar Controls */}
//         <div className="flex items-center gap-3 md:hidden">
//           <Link to="/wishlist" className="relative p-1">
//             <svg
//               className="w-6 h-6 text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
//               />
//             </svg>
//             {wishlistCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
//                 {wishlistCount}
//               </span>
//             )}
//           </Link>

//           <Link to="/cart" className="relative p-1">
//             <svg
//               className="w-6 h-6 text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
//               />
//             </svg>
//             {totalCartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
//                 {totalCartCount}
//               </span>
//             )}
//           </Link>

//           <button
//             className="p-1 text-2xl text-gray-700 cursor-pointer focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle Navigation Menu"
//           >
//             {isOpen ? "✕" : "☰"}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Drawer Menu */}
//       {isOpen && (
//         <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3 text-gray-700 font-medium">
//           {/* Mobile Search Bar inside menu */}
//           <div className="relative mb-2">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setShowResults(true);
//               }}
//               onFocus={() => setShowResults(true)}
//               className="w-full border border-gray-300 placeholder:text-gray-500 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
//             />
//             {showResults && searchResults.length > 0 && (
//               <div className="mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
//                 {searchResults.map((product) => (
//                   <button
//                     key={product.id}
//                     onClick={() => handleSelectProduct(product.id)}
//                     className="w-full text-left px-3 py-2 hover:bg-green-50 flex items-center gap-3 transition text-xs text-gray-700 cursor-pointer"
//                   >
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-7 h-7 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium text-gray-900">{product.name}</p>
//                       <p className="text-xs text-gray-500">₦{product.price}</p>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {isAuthenticated && (
//             <div className="flex items-center gap-3 p-2.5 bg-green-50 rounded-lg">
//               <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">
//                 {user?.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//               <div className="overflow-hidden">
//                 <p className="font-semibold text-sm text-gray-900 truncate">{user?.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//               </div>
//             </div>
//           )}

//           {isAuthenticated && (
//             <>
//               <Link
//                 to="/orders"
//                 onClick={() => setIsOpen(false)}
//                 className="py-1 text-sm hover:text-green-600"
//               >
//                 📦 My Orders
//               </Link>
//               <Link
//                 to="/profile"
//                 onClick={() => setIsOpen(false)}
//                 className="py-1 text-sm hover:text-green-600"
//               >
//                 👤 Profile Settings
//               </Link>
//             </>
//           )}

//           <Link
//             to="/wishlist"
//             onClick={() => setIsOpen(false)}
//             className="flex items-center justify-between py-1 text-sm"
//           >
//             <span>Wishlist</span>
//             {wishlistCount > 0 && (
//               <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                 {wishlistCount}
//               </span>
//             )}
//           </Link>

//           <Link
//             to="/cart"
//             onClick={() => setIsOpen(false)}
//             className="flex items-center justify-between py-1 text-sm"
//           >
//             <span>Cart</span>
//             {totalCartCount > 0 && (
//               <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                 {totalCartCount}
//               </span>
//             )}
//           </Link>

//           <Link to="/about" onClick={() => setIsOpen(false)} className="py-1 text-sm">
//             About
//           </Link>
//           <Link to="/contact" onClick={() => setIsOpen(false)} className="py-1 text-sm">
//             Contact
//           </Link>

//           {isAuthenticated ? (
//             <button
//               onClick={() => {
//                 setIsOpen(false);
//                 logout();
//               }}
//               className="w-full text-left bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium text-center hover:bg-red-100 transition cursor-pointer"
//             >
//               Sign Out
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               onClick={() => setIsOpen(false)}
//               className="bg-green-600 text-white text-center py-2 text-sm rounded-lg hover:bg-green-700 transition"
//             >
//               Sign In
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext";
import products from "../data/product";
import categories from "../data/categories";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const { cartItems } = useCart();
  const { wishlistCount } = useWishlist();

  const totalCartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const searchResults =
    search.trim() === ""
      ? []
      : products
          .filter(
            (product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.category?.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 5);

  const handleSelectProduct = (productId) => {
    setSearch("");
    setShowResults(false);
    setIsOpen(false);
    navigate(`/products/${productId}`);
  };

  const toggleCategoryExpand = (slug) => {
    setExpandedCategory((prev) => (prev === slug ? null : slug));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setMobileUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-3 sm:px-6 py-3 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-1 text-2xl text-gray-700 cursor-pointer focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>

            <Link
              to="/"
              className="text-lg sm:text-xl font-bold text-green-700 shrink-0"
            >
              Logo
            </Link>
          </div>

          {/* Search Bar: Desktop & Tablet */}
          <div className="hidden md:block relative flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full border border-gray-300 placeholder:text-gray-500 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />

            {showResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="w-full text-left px-4 py-2 hover:bg-green-50 flex items-center gap-3 transition text-sm text-gray-700 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">₦{product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 font-medium">
            <Link
              to="/wishlist"
              className="relative flex items-center gap-1 hover:text-green-600 transition py-1 px-1.5"
            >
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-red-500 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              <span className="text-xs lg:text-sm">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:text-green-600 transition py-1 px-1.5"
            >
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 hover:text-green-600 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              <span className="text-xs lg:text-sm">Cart</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <Link
              to="/about"
              className="text-xs lg:text-sm hover:text-green-600 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-xs lg:text-sm hover:text-green-600 transition"
            >
              Contact
            </Link>

            {/* Desktop User Account Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none cursor-pointer bg-green-50 py-1 px-3 rounded-full border border-green-200 hover:bg-green-100 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-xs">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <span className="text-xs lg:text-sm font-semibold text-gray-800">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-600 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 transition"
                    >
                      📦 My Orders
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 transition"
                    >
                      👤 Profile Settings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 text-white text-xs lg:text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Right Mobile Controls: Wishlist, Cart, Profile Dropdown */}
          <div className="flex items-center gap-3 md:hidden">
            <Link to="/wishlist" className="relative p-1">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-1">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Mobile Account Menu */}
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setMobileUserMenuOpen(!mobileUserMenuOpen)}
                className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-xs focus:outline-none"
              >
                {isAuthenticated
                  ? user?.name?.charAt(0).toUpperCase() || "U"
                  : "👤"}
              </button>

              {mobileUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/orders"
                        onClick={() => setMobileUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 transition"
                      >
                        📦 My Orders
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setMobileUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-green-50 transition"
                      >
                        👤 Profile Settings
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => {
                          setMobileUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        🚪 Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileUserMenuOpen(false)}
                      className="flex items-center justify-center mx-3 my-1 bg-green-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden relative w-full mt-0.5">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="w-full border border-gray-300 placeholder:text-gray-400 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50/50"
          />

          {showResults && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="w-full text-left px-3 py-2 hover:bg-green-50 flex items-center gap-3 transition text-xs text-gray-700 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-7 h-7 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">₦{product.price}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Drawer Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3 text-gray-700 font-medium max-h-[80vh] overflow-y-auto">
          {/* Action Quick Links */}
          <div className="grid grid-cols-2 gap-2 my-1">
            <Link
              to="/sell"
              onClick={() => setIsOpen(false)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium text-center py-2 rounded-lg text-xs"
            >
              Sell Products
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="border border-green-600 text-green-600 hover:bg-green-50 font-medium text-center py-2 rounded-lg text-xs"
            >
              Track Orders
            </Link>
          </div>

          {/* Categories Accordion Section */}
          <div className="border-t border-b border-gray-100 py-2">
            <p className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2 px-1">
              Categories
            </p>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <div key={cat.slug} className="flex flex-col">
                  <div className="flex items-center justify-between text-sm py-1.5 px-1 hover:text-green-600">
                    <Link
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 font-medium text-gray-800"
                    >
                      {cat.name}
                    </Link>
                    {cat.subCategory && cat.subCategory.length > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleCategoryExpand(cat.slug)}
                        className="px-2 text-xs text-gray-400 hover:text-green-600"
                      >
                        {expandedCategory === cat.slug ? "▲" : "▼"}
                      </button>
                    )}
                  </div>

                  {expandedCategory === cat.slug && cat.subCategory && (
                    <div className="pl-4 flex flex-col gap-1 my-1 border-l-2 border-green-200">
                      {cat.subCategory.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/category/${cat.slug}/${sub.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="text-xs text-gray-600 py-1 hover:text-green-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* General Links */}
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="py-1 text-sm"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="py-1 text-sm"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}