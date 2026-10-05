import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import products from "../data/product";

function FilterModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Touch drag-to-dismiss states
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  // Handle body scroll locking safely
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["all", ...new Set(cats)];
  }, []);

  // Filter products based on search term & category
  const { exactMatches, relatedSuggestions } = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      const list =
        selectedCategory === "all"
          ? products
          : products.filter(
              (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
      return { exactMatches: list, relatedSuggestions: [] };
    }

    const exact = products.filter((p) => {
      const matchCat =
        selectedCategory === "all" ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchName = p.name?.toLowerCase().includes(query);
      const matchCategoryText = p.category?.toLowerCase().includes(query);
      return matchCat && (matchName || matchCategoryText);
    });

    let related = [];
    if (exact.length === 0) {
      const tokens = query.split(/\s+/);
      related = products.filter((p) => {
        const pSub = (p.subcategory || p.subCategory || "").toLowerCase();
        const pCat = (p.category || "").toLowerCase();
        return tokens.some((token) => pSub.includes(token) || pCat.includes(token));
      });

      if (related.length === 0) {
        related = products.slice(0, 4);
      }
    }

    return { exactMatches: exact, relatedSuggestions: related.slice(0, 4) };
  }, [searchTerm, selectedCategory]);

  // Touch handlers for mobile drag down
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 120) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch bg-black/60 backdrop-blur-xs transition-opacity">
      {/* Backdrop */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} />

      {/* Sheet / Drawer Container */}
      <div
        style={{
          transform: dragY > 0 ? `translateY(${dragY}px)` : "translateY(0)",
          transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0, 0, 0.2, 1)",
        }}
        className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-none h-[88vh] md:h-full shadow-2xl flex flex-col z-10 overflow-hidden"
      >
        {/* Mobile Drag Column Handle */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="md:hidden w-full py-3 flex flex-col items-center justify-center bg-gray-50 border-b border-gray-100 cursor-grab active:cursor-grabbing select-none"
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-1" />
          <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
            Drag down to close
          </span>
        </div>

        {/* Header */}
        <div className="px-4 py-3.5 border-b flex items-center justify-between bg-gray-50/80">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter Products
          </h2>
          <button
            onClick={onClose}
            aria-label="Close filter menu"
            className="w-8 h-8 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 space-y-3.5 border-b bg-white">
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-gray-500 uppercase mb-1">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Type product name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-green-700 focus:outline-none text-sm bg-gray-50/50 focus:bg-white transition"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-wider text-gray-500 uppercase mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-green-700 focus:outline-none text-sm capitalize bg-gray-50/50 focus:bg-white transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {exactMatches.length > 0 && (
            <div>
              <p className="text-[11px] font-bold tracking-wider text-gray-400 mb-2 uppercase">
                Found ({exactMatches.length})
              </p>
              <div className="space-y-2.5">
                {exactMatches.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-green-600 hover:shadow-xs transition bg-white"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-green-700 font-bold mt-0.5">
                        ₦{product.price?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {exactMatches.length === 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl text-center">
                <p className="text-xs sm:text-sm font-bold text-red-600">No product found</p>
                <p className="text-xs text-red-500 mt-1">
                  We couldn't find anything matching "{searchTerm}".
                </p>
              </div>

              {relatedSuggestions.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-gray-500 uppercase mb-2">
                    You might also like
                  </p>
                  <div className="space-y-2.5">
                    {relatedSuggestions.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-green-600 transition bg-gray-50/60"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-green-700 font-bold mt-0.5">
                            ₦{product.price?.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterModal;