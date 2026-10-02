import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "card",
  });

  const deliveryFee = cart.length > 0 ? 1500 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setPaymentSuccess(true);
    clearCart();
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 min-h-[70vh]">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
          Shopping Cart
        </h1>

        {paymentSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-6 sm:p-8 rounded-2xl text-center max-w-xl mx-auto shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Thank you, <strong>{formData.fullName || "Customer"}</strong>. We have received your order and sent a confirmation email to <strong>{formData.email}</strong>.
            </p>
            <Link
              to="/"
              onClick={() => setPaymentSuccess(false)}
              className="inline-block w-full sm:w-auto bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition active:scale-[0.98]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-base sm:text-lg mb-4">Your cart is currently empty.</p>
            <Link
              to="/"
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition active:scale-[0.98]"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* ITEM LIST */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 p-4 rounded-2xl bg-white shadow-xs"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-gray-100 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 capitalize truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">{item.grade}</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1">
                        ₦{item.price.toLocaleString()}{" "}
                        <span className="text-gray-400 font-normal">/ {item.unit}</span>
                      </p>
                    </div>
                  </div>

                  {/* CONTROLS & SUB-TOTAL (Mobile stacked / Desktop row) */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-700 font-bold hover:bg-white rounded transition active:bg-gray-200"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-semibold text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-700 font-bold hover:bg-white rounded transition active:bg-gray-200"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <p className="font-bold text-sm sm:text-base text-gray-900">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 hover:underline mt-0.5"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CHECKOUT & ORDER SUMMARY */}
            <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200 h-fit space-y-6">
              <h2 className="text-lg sm:text-xl font-bold border-b border-gray-200 pb-3 text-gray-900">
                Checkout Details
              </h2>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-600 bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-600 bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Delivery Address</label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full shipping address..."
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-600 bg-white transition resize-none"
                  />
                </div>

                {/* SUMMARY AMOUNTS */}
                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-800">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-gray-800">₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base sm:text-lg text-gray-900 border-t border-gray-200 pt-3 mt-2">
                    <span>Grand Total</span>
                    <span className="text-green-700">₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white font-bold py-3.5 rounded-xl hover:bg-green-800 transition active:scale-[0.99] shadow-xs cursor-pointer"
                >
                  Pay ₦{grandTotal.toLocaleString()}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default CartPage;