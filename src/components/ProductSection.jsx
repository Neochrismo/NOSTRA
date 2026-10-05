import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection({ title, products, viewAllLink, subtitle = "Up to 50% Off" }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable arrow buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Disable left arrow if we are at the very start (with 1px tolerance)
      setCanScrollLeft(scrollLeft > 1);
      // Disable right arrow if scrolled all the way to the end
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [products]);

  // Scroll left or right when clicking the navigation arrows
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#2d7d46] rounded-2xl p-4 sm:p-6 my-6 w-full shadow-md relative group">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-white/90 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="bg-white/90 hover:bg-white text-gray-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 transition cursor-pointer shadow-xs shrink-0"
          >
            See All <span className="text-sm">→</span>
          </Link>
        )}
      </div>

      {/* Left Navigation Arrow Button */}
      <button
        type="button"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`absolute left-1 top-[58%] -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full shadow-lg transition-all ${
          canScrollLeft
            ? "bg-white/90 hover:bg-white text-gray-800 opacity-90 hover:scale-110 active:scale-95 cursor-pointer"
            : "bg-white/40 text-gray-400 opacity-40 cursor-not-allowed"
        }`}
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
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Navigation Arrow Button */}
      <button
        type="button"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`absolute right-1 top-[58%] -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full shadow-lg transition-all ${
          canScrollRight
            ? "bg-white/90 hover:bg-white text-gray-800 opacity-90 hover:scale-110 active:scale-95 cursor-pointer"
            : "bg-white/40 text-gray-400 opacity-40 cursor-not-allowed"
        }`}
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
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[150px] xs:w-[170px] sm:w-[190px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;