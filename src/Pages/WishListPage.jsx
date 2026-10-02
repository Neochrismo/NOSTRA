import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => addToCart(item));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl sm:text-3xl font-bold shadow-xs">
          ♥
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Wishlist is empty</h2>
        <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto">
          Explore products and click the heart icon to save items you love for later.
        </p>
        <Link
          to="/"
          className="inline-block w-full sm:w-auto bg-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition active:scale-[0.98]"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-b sm:border-b-0 border-gray-100 pb-4 sm:pb-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleMoveAllToCart}
            className="flex-1 sm:flex-none bg-green-700 text-white font-medium px-4 py-2.5 rounded-xl hover:bg-green-800 transition text-xs sm:text-sm cursor-pointer active:scale-[0.98]"
          >
            Add All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="flex-1 sm:flex-none border border-gray-300 text-gray-700 font-medium px-4 py-2.5 rounded-xl hover:bg-gray-100 transition text-xs sm:text-sm cursor-pointer active:scale-[0.98]"
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="relative overflow-hidden rounded-xl bg-gray-50 mb-3">
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-48 sm:h-44 object-cover"
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 shadow-xs transition active:scale-90"
                title="Remove"
              >
                ✕
              </button>
            </div>

            <div className="flex-1">
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base capitalize hover:text-green-700 transition line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-green-700 font-bold mt-1 text-base sm:text-lg">
                ₦{(product.price || 0).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => {
                addToCart(product);
                removeFromWishlist(product.id);
              }}
              className="mt-4 w-full bg-green-700 text-white font-medium py-2.5 rounded-xl hover:bg-green-800 transition text-xs sm:text-sm cursor-pointer active:scale-[0.98]"
            >
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;