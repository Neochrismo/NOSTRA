// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import ProductQuickViewModal from "./ProductQuickViewModal";
// import { useWishlist } from "../context/WishlistContext";

// function ProductCard({ product }) {
//   const { addToCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

//   const favorited = isInWishlist(product?.id);

//   return (
//     <>
//       <div className="group relative bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
//         {/* Image Container */}
//         <div className="relative overflow-hidden rounded-lg bg-gray-50 mb-3 aspect-square sm:aspect-auto">
//           <img
//             src={product?.image || "/placeholder.jpg"}
//             alt={product?.name || "Product image"}
//             className="w-full h-36 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//           />

//           {/* Wishlist Button */}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.preventDefault();
//               toggleWishlist(product);
//             }}
//             title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
//             className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:scale-110 shadow transition active:scale-95 cursor-pointer z-10"
//           >
//             <svg
//               className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
//                 favorited
//                   ? "fill-red-500 text-red-500"
//                   : "fill-none stroke-gray-600 hover:stroke-red-500"
//               }`}
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
//               />
//             </svg>
//           </button>

//           {/* Quick View Button - Always visible on mobile, hover-triggered on desktop */}
//           <button
//             type="button"
//             onClick={() => setIsQuickViewOpen(true)}
//             title="Quick View"
//             className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-green-700 hover:bg-white shadow transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
//           >
//             <svg
//               className="w-4 h-4 sm:w-5 sm:h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Product Details */}
//         <div className="flex-1 flex flex-col justify-between">
//           <Link to={`/products/${product?.id}`} className="block">
//             <h3 className="font-semibold text-gray-800 text-sm sm:text-base capitalize hover:text-green-700 transition line-clamp-2 leading-tight">
//               {product?.name}
//             </h3>
//           </Link>
//           <div className="mt-2 flex flex-wrap items-baseline gap-1">
//             <p className="text-green-700 font-bold text-base sm:text-lg">
//               ₦{(product?.price || 0).toLocaleString()}
//             </p>
//             {product?.unit && (
//               <span className="text-xs text-gray-500 font-normal">
//                 / {product.unit}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Action Button */}
//         <div className="mt-3 sm:mt-4">
//           <button
//             type="button"
//             onClick={() => addToCart(product)}
//             className="w-full bg-green-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg hover:bg-green-800 active:bg-green-900 transition text-xs sm:text-sm cursor-pointer min-h-[40px] flex items-center justify-center"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Quick View Modal */}
//       {isQuickViewOpen && (
//         <ProductQuickViewModal
//           product={product}
//           onClose={() => setIsQuickViewOpen(false)}
//         />
//       )}
//     </>
//   );
// }

// export default ProductCard;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishListContext";
import ProductQuickViewModal from "./ProductQuickViewModal";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const navigate = useNavigate();

  const favorited = isInWishlist(product?.id);

  // Navigate to product detail page when card is clicked
  const handleCardClick = () => {
    navigate(`/products/${product?.id}`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation(); // Prevents navigating to the detail page
    e.preventDefault();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation(); // Prevents navigating to the detail page
    e.preventDefault();
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents navigating to the detail page
    e.preventDefault();
    addToCart(product);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-gray-50 mb-3 aspect-square sm:aspect-auto">
          <img
            src={product?.image || "/placeholder.jpg"}
            alt={product?.name || "Product image"}
            className="w-full h-36 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
            className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:scale-110 shadow transition active:scale-95 cursor-pointer z-10"
          >
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                favorited
                  ? "fill-red-500 text-red-500"
                  : "fill-none stroke-gray-600 hover:stroke-red-500"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            onClick={handleQuickView}
            title="Quick View"
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-green-700 hover:bg-white shadow transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer z-10"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base capitalize group-hover:text-green-700 transition line-clamp-2 leading-tight">
            {product?.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-1">
            <p className="text-green-700 font-bold text-base sm:text-lg">
              ₦{(product?.price || 0).toLocaleString()}
            </p>
            {product?.unit && (
              <span className="text-xs text-gray-500 font-normal">
                / {product.unit}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3 sm:mt-4">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-green-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg hover:bg-green-800 active:bg-green-900 transition text-xs sm:text-sm cursor-pointer min-h-[40px] flex items-center justify-center relative z-10"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <ProductQuickViewModal
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}

export default ProductCard;