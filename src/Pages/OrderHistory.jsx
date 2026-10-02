import React, { useState } from "react";
import { Link } from "react-router-dom";

const mockOrders = [
  {
    id: "ORD-98241",
    date: "2026-09-28",
    status: "Delivered",
    shippingAddress: "14 Broad Street, Victoria Island, Lagos",
    paymentMethod: "Paystack (Card)",
    totalAmount: 1300,
    items: [
      {
        id: 1,
        name: "Organic Coffee Beans",
        price: 100,
        quantity: 3,
        image: "/cashcrops/beverage/coffee-beans.jpg",
      },
      {
        id: 2,
        name: "Organic Cocoa Seeds",
        price: 100,
        quantity: 10,
        image: "/cashcrops/beverage/cocoa-seed2.jpg",
      },
    ],
  },
  {
    id: "ORD-98110",
    date: "2026-10-01",
    status: "Dispatched",
    shippingAddress: "14 Broad Street, Victoria Island, Lagos",
    paymentMethod: "Bank Transfer",
    totalAmount: 200,
    items: [
      {
        id: 3,
        name: "tea Plant",
        price: 100,
        quantity: 2,
        image: "cashcrops/beverage/tea-plant.jpg",
      },
    ],
  },
  {
    id: "ORD-98002",
    date: "2026-10-02",
    status: "Pending",
    shippingAddress: "14 Broad Street, Victoria Island, Lagos",
    paymentMethod: "Paystack (Card)",
    totalAmount: 15000,
    items: [
      {
        id: 4,
        name: "maize",
        price: 100,
        quantity: 150,
        image: "/food-crops-pictures/cereals/maize.jpg",
      },
    ],
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800 border-amber-300",
  Dispatched: "bg-blue-100 text-blue-800 border-blue-300",
  Delivered: "bg-green-100 text-green-800 border-green-300",
  Cancelled: "bg-red-100 text-red-800 border-red-300",
};

export default function OrderHistory({ user }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filteredOrders =
    activeFilter === "All"
      ? mockOrders
      : mockOrders.filter((order) => order.status === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Profile Header Banner */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-xs shrink-0">
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
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {user?.name || "Customer Name"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{user?.email || "user@example.com"}</p>
          <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2 border border-green-100">
            Verified Member
          </span>
        </div>
        <div className="w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
          <div className="bg-green-50/50 px-4 py-2.5 rounded-xl border border-green-100 text-center">
            <span className="block text-lg sm:text-xl font-bold text-green-700">
              {mockOrders.length}
            </span>
            <span className="text-xs text-gray-600">Total Orders</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Order History</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {["All", "Pending", "Dispatched", "Delivered"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition whitespace-nowrap cursor-pointer active:scale-95 ${
                activeFilter === status
                  ? "bg-green-700 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 text-center">
          <p className="text-gray-500 text-sm sm:text-base">No orders found matching "{activeFilter}".</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-green-800 transition active:scale-[0.98]"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden hover:shadow-md transition"
            >
              {/* Order Card Header */}
              <div className="bg-gray-50/80 px-4 sm:px-6 py-3.5 flex flex-wrap justify-between items-center gap-3 border-b border-gray-100 text-xs sm:text-sm">
                <div className="flex items-center gap-3 sm:gap-6">
                  <div>
                    <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-medium">Order ID</span>
                    <span className="font-bold text-gray-800">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-gray-400 block uppercase font-medium">Date Placed</span>
                    <span className="text-gray-700 font-medium">{order.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold border ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                  <button
                    onClick={() => setSelectedReceipt(order)}
                    className="text-xs font-semibold text-green-700 hover:text-green-800 underline cursor-pointer"
                  >
                    View Receipt
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm capitalize truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                          Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="px-4 sm:px-6 py-3 bg-gray-50/40 flex justify-between items-center border-t border-gray-100 text-xs sm:text-sm">
                <span className="text-[11px] sm:text-xs text-gray-500">
                  Paid via {order.paymentMethod}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500">Total:</span>
                  <span className="text-base sm:text-lg font-bold text-green-700">
                    ₦{order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                Official Receipt
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-3">
                {selectedReceipt.id}
              </h3>
              <p className="text-xs text-gray-500">{selectedReceipt.date}</p>
            </div>

            <div className="border-t border-b border-dashed border-gray-200 py-3 mb-4 space-y-2 text-xs sm:text-sm">
              {selectedReceipt.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-gray-700 truncate pr-2">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-medium text-gray-900 shrink-0">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-gray-600 mb-6">
              <div className="flex justify-between items-start gap-2">
                <span className="shrink-0">Shipping Address:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {selectedReceipt.shippingAddress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Method:</span>
                <span className="font-semibold text-gray-800">
                  {selectedReceipt.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-sm font-bold text-gray-900">
                <span>Grand Total:</span>
                <span className="text-green-700 text-base">
                  ₦{selectedReceipt.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition active:scale-[0.98] cursor-pointer"
            >
              🖨️ Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}