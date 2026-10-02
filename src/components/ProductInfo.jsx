import { useCart } from "../context/CartContext";

function ProductInfo({ product }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleDecrease = () => {
    if (currentQuantity > 0) {
      updateQuantity(product.id, currentQuantity - 1);
    }
  };

  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(product.id, currentQuantity + 1);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-4 sm:space-y-6">
      {/* Category & Breadcrumbs */}
      <div>
        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
          {product.category} {product.subcategory && `/ ${product.subcategory}`}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-1">
          {product.name}
        </h1>
        {product.commonName && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1 capitalize">
            Common name: {product.commonName}
          </p>
        )}
      </div>

      {/* Product Attributes */}
      <div className="space-y-2 sm:space-y-3 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100 text-xs sm:text-sm">
        <p className="text-gray-700">
          <strong className="text-gray-900">Grade: </strong>
          {product.grade}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">State: </strong>
          {product.stateofharvest}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Harvest date: </strong>
          {product.harvestDate}
        </p>
      </div>

      {/* Pricing */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            ₦{product.price.toLocaleString()}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            per {product.unit}
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3 pt-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700 mr-2">
          Quantity:
        </span>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button
            onClick={handleDecrease}
            disabled={currentQuantity === 0}
            className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 transition font-bold min-h-[44px]"
          >
            -
          </button>
          <span className="font-semibold text-sm sm:text-base px-4 text-gray-800 min-w-[2.5rem] text-center">
            {currentQuantity}
          </span>
          <button
            onClick={handleIncrease}
            className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition font-bold min-h-[44px]"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              if (currentQuantity === 0) {
                addToCart(product, 1);
              }
            }}
            className="flex-1 bg-green-700 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-800 active:bg-green-900 transition text-sm sm:text-base min-h-[48px]"
          >
            {currentQuantity > 0 ? "In Cart" : "Add to Cart"}
          </button>
          <button
            onClick={() => {
              if (currentQuantity === 0) {
                addToCart(product, 1);
              }
              window.location.href = "/cart";
            }}
            className="flex-1 border-2 border-green-700 text-green-700 py-3 px-4 rounded-xl font-semibold hover:bg-green-50 active:bg-green-100 transition text-sm sm:text-base min-h-[48px]"
          >
            Buy Now
          </button>
        </div>
        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 font-medium transition text-sm sm:text-base min-h-[44px]">
          Chat Seller
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;