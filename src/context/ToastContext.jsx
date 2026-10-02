import React, { createContext, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Trigger a new toast notification
  const showToast = useCallback((message, product = null) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, product }]);

    // Automatically remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Floating Toast Notification Container (Top Right Corner) */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-green-200 rounded-xl shadow-xl p-4 flex items-center justify-between gap-3 transform transition-all duration-300 animate-slide-in"
          >
            {/* Left Section: Icon + Product Thumbnail / Info */}
            <div className="flex items-center gap-3 overflow-hidden">
              {toast.product?.image ? (
                <img
                  src={toast.product.image}
                  alt={toast.product.name}
                  className="w-10 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  ✓
                </div>
              )}

              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {toast.message}
                </p>
                {toast.product?.name && (
                  <p className="text-xs text-gray-500 truncate">
                    {toast.product.name}
                  </p>
                )}
              </div>
            </div>

            {/* Right Section: View Cart Action + Dismiss Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to="/cart"
                onClick={() => removeToast(toast.id)}
                className="text-xs font-bold text-green-700 hover:text-green-800 hover:underline bg-green-50 px-2.5 py-1.5 rounded-md transition"
              >
                View Cart
              </Link>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm px-1"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}