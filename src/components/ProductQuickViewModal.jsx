import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductQuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    // Add product using selected quantity
    addToCart({ ...product, selectedQuantity: quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 overflow-hidden flex flex-col md:flex-row gap-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-xl p-1 rounded-full hover:bg-gray-100 transition z-10"
        >
          ✕
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 rounded-xl p-2">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide bg-green-50 px-2 py-1 rounded">
              {product.category || "General"}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 capitalize">
              {product.name}
            </h2>
            <p className="text-xl font-bold text-green-700 mt-1">
              ₦{(product.price || 0).toLocaleString()}
              {product.unit && (
                <span className="text-xs text-gray-500 font-normal"> / {product.unit}</span>
              )}
            </p>
            <p className="text-gray-600 text-sm mt-3 line-clamp-3">
              {product.description ||
                "High quality product sourced directly from verified suppliers. Fresh, natural, and carefully packaged."}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition shadow-sm cursor-pointer"
            >
              Add {quantity} to Cart • ₦{((product.price || 0) * quantity).toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductQuickViewModal;