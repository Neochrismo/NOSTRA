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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishListContext";
// import ProductQuickViewModal from "./ProductQuickViewModal";

// function ProductCard({ product }) {
//   const { addToCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//   const navigate = useNavigate();

//   const favorited = isInWishlist(product?.id);

//   // Calculate discount percentage if old price exists
//   const discountPercentage =
//     product?.oldPrice && product?.price
//       ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//       : null;

//   const handleCardClick = () => {
//     navigate(`/products/${product?.id}`);
//   };

//   const handleToggleWishlist = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     toggleWishlist(product);
//   };

//   const handleQuickView = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setIsQuickViewOpen(true);
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     addToCart(product);
//   };

//   return (
//     <>
//       <div
//         onClick={handleCardClick}
//         className="group relative bg-white rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full cursor-pointer select-none border border-gray-100"
//       >
//         {/* Top Image Box */}
//         <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center p-2">
//           <img
//             src={product?.image || "/placeholder.jpg"}
//             alt={product?.name || "Product image"}
//             className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
//           />

//           {/* Wishlist Button */}
//           <button
//             type="button"
//             onClick={handleToggleWishlist}
//             title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
//             className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-700 hover:scale-110 shadow-xs transition active:scale-95 cursor-pointer z-10"
//           >
//             <svg
//               className={`w-4 h-4 transition-colors ${
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

//           {/* Quick View Button */}
//           <button
//             type="button"
//             onClick={handleQuickView}
//             title="Quick View"
//             className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs p-2 rounded-full text-gray-700 hover:text-green-700 hover:bg-white shadow-xs transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer z-10"
//           >
//             <svg
//               className="w-4 h-4"
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

//         {/* Product Information */}
//         <div className="flex-1 flex flex-col justify-between space-y-2">
//           {/* Title */}
//           <h3 className="font-medium text-gray-700 text-sm sm:text-base leading-snug line-clamp-2">
//             {product?.name}
//           </h3>

//           {/* Rating Section */}
//           <div className="flex items-center gap-1.5">
//             <span className="text-orange-400 text-xs sm:text-sm">★</span>
//             <span className="font-bold text-gray-800 text-xs sm:text-sm">
//               {product?.rating || "4.5"}
//             </span>
//             <span className="text-gray-400 text-xs">
//               ({product?.reviewsCount || product?.reviews?.length || 0})
//             </span>
//           </div>

//           {/* Price & Discount Section */}
//           <div>
//             <p className="text-gray-900 font-extrabold text-lg sm:text-xl tracking-tight">
//               ₦{(product?.price || 0).toLocaleString()}
//             </p>

//             <div className="flex items-center justify-between mt-1 min-h-[22px]">
//               {product?.oldPrice ? (
//                 <span className="text-xs text-gray-400 line-through font-medium">
//                   ₦{product.oldPrice.toLocaleString()}
//                 </span>
//               ) : (
//                 <span />
//               )}

//               {(discountPercentage || product?.discount) && (
//                 <span className="bg-emerald-700 text-white font-bold text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md">
//                   -{discountPercentage || product.discount}%
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Action Button */}
//         <div className="mt-3">
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-semibold py-2 px-3 rounded-xl transition text-xs sm:text-sm cursor-pointer shadow-xs"
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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishListContext";
// import ProductQuickViewModal from "./ProductQuickViewModal";

// function ProductCard({ product }) {
//   const { addToCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//   const navigate = useNavigate();

//   const favorited = isInWishlist(product?.id);

//   // Calculate discount percentage if old price exists
//   const discountPercentage =
//     product?.oldPrice && product?.price
//       ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//       : null;

//   const handleCardClick = () => {
//     navigate(`/products/${product?.id}`);
//   };

//   const handleToggleWishlist = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     toggleWishlist(product);
//   };

//   const handleQuickView = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setIsQuickViewOpen(true);
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     addToCart(product);
//   };

//   return (
//     <>
//       <div
//         onClick={handleCardClick}
//         className="group relative bg-white rounded-2xl p-2.5 sm:p-3.5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full cursor-pointer select-none border border-gray-100"
//       >
//         {/* Image Area */}
//         <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-2.5 flex items-center justify-center p-2">
//           <img
//             src={product?.image || "/placeholder.jpg"}
//             alt={product?.name || "Product image"}
//             className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
//           />

//           {/* Wishlist Button */}
//           <button
//             type="button"
//             onClick={handleToggleWishlist}
//             title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
//             className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-xs p-1.5 sm:p-2 rounded-full text-gray-700 hover:scale-110 shadow-xs transition active:scale-95 cursor-pointer z-10"
//           >
//             <svg
//               className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
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

//           {/* Quick View Button */}
//           <button
//             type="button"
//             onClick={handleQuickView}
//             title="Quick View"
//             className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-xs p-1.5 sm:p-2 rounded-full text-gray-700 hover:text-green-700 hover:bg-white shadow-xs transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer z-10"
//           >
//             <svg
//               className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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

//         {/* Info Area */}
//         <div className="flex-1 flex flex-col justify-between space-y-1.5">
//           <h3 className="font-medium text-gray-800 text-xs sm:text-sm leading-snug line-clamp-2">
//             {product?.name}
//           </h3>

//           <div className="flex items-center gap-1">
//             <span className="text-orange-400 text-xs">★</span>
//             <span className="font-bold text-gray-800 text-xs">
//               {product?.rating || "4.5"}
//             </span>
//             <span className="text-gray-400 text-[10px] sm:text-xs">
//               ({product?.reviewsCount || product?.reviews?.length || 0})
//             </span>
//           </div>

//           <div>
//             <p className="text-gray-900 font-extrabold text-sm sm:text-base tracking-tight">
//               ₦{(product?.price || 0).toLocaleString()}
//             </p>

//             <div className="flex items-center justify-between mt-0.5 min-h-[20px]">
//               {product?.oldPrice ? (
//                 <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">
//                   ₦{product.oldPrice.toLocaleString()}
//                 </span>
//               ) : (
//                 <span />
//               )}

//               {(discountPercentage || product?.discount) && (
//                 <span className="bg-emerald-700 text-white font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md">
//                   -{discountPercentage || product.discount}%
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Action Button */}
//         <div className="mt-2.5">
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-semibold py-1.5 px-2 rounded-xl transition text-xs cursor-pointer shadow-xs"
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