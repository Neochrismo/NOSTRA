// import React from "react";

// function ProductFilterSort({
//   sortBy,
//   setSortBy,
//   priceRange,
//   setPriceRange,
//   maxPriceLimit = 50000,
//   totalResults,
// }) {
//   const isFiltered = priceRange < maxPriceLimit;

//   return (
//     <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//       {/* 1. Price Range Filter */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b md:border-b-0 pb-3 md:pb-0 border-gray-100">
//         <div className="flex items-center justify-between sm:justify-start gap-2">
//           <label htmlFor="price-range" className="text-xs sm:text-sm font-bold text-gray-800">
//             Filter Price:
//           </label>
//           {isFiltered && (
//             <button
//               onClick={() => setPriceRange(maxPriceLimit)}
//               className="text-xs text-green-700 hover:text-green-800 font-semibold underline sm:hidden"
//             >
//               Reset
//             </button>
//           )}
//         </div>

//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <input
//             id="price-range"
//             type="range"
//             min="0"
//             max={maxPriceLimit}
//             step="500"
//             value={priceRange}
//             onChange={(e) => setPriceRange(Number(e.target.value))}
//             className="w-full sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
//           />
//           <span className="text-xs sm:text-sm font-semibold text-gray-900 shrink-0 min-w-[100px] text-right sm:text-left">
//             Up to ₦{priceRange.toLocaleString()}
//           </span>
//           {isFiltered && (
//             <button
//               onClick={() => setPriceRange(maxPriceLimit)}
//               className="hidden sm:inline-block text-xs text-green-700 hover:text-green-800 font-semibold hover:underline shrink-0"
//             >
//               Reset
//             </button>
//           )}
//         </div>
//       </div>

//       {/* 2. Total Results Indicator */}
//       <div className="flex items-center justify-between md:justify-center text-xs sm:text-sm text-gray-500 font-medium">
//         <span>
//           Showing <strong className="text-gray-900 font-bold">{totalResults}</strong> {totalResults === 1 ? "product" : "products"}
//         </span>
//         <span className="md:hidden bg-green-50 text-green-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-green-100">
//           Active
//         </span>
//       </div>

//       {/* 3. Sorting Options */}
//       <div className="flex items-center justify-between sm:justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
//         <label htmlFor="sort" className="text-xs sm:text-sm font-bold text-gray-800 shrink-0">
//           Sort by:
//         </label>
//         <select
//           id="sort"
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="w-full sm:w-auto border border-gray-200 rounded-xl text-xs sm:text-sm px-3 py-2 bg-gray-50/50 text-gray-800 font-medium outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition cursor-pointer"
//         >
//           <option value="default">Default</option>
//           <option value="price-low-high">Price: Low to High</option>
//           <option value="price-high-low">Price: High to Low</option>
//           <option value="alphabetical">Alphabetical (A - Z)</option>
//           <option value="popularity">Popularity / Rating</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// export default ProductFilterSort;

import React, { useState } from "react";

function ProductFilterSort({
  sortBy,
  setSortBy,
  priceRange = [0, 50000], // Expects [min, max]
  setPriceRange,
  maxPriceLimit = 50000,
  minPriceLimit = 0,
  totalResults,
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const minVal = Array.isArray(priceRange) ? priceRange[0] : 0;
  const maxVal = Array.isArray(priceRange) ? priceRange[1] : priceRange;

  const isFiltered = minVal > minPriceLimit || maxVal < maxPriceLimit;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 500);
    setPriceRange([value, maxVal]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 500);
    setPriceRange([minVal, value]);
  };

  const handleReset = () => {
    setPriceRange([minPriceLimit, maxPriceLimit]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-100 mb-6 p-4 sm:p-5">
      {/* Mobile Control Toggle Bar (< md) */}
      <div className="flex md:hidden items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>{isOpenMobile ? "Hide Filters" : "Filters & Sort"}</span>
          {isFiltered && (
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
          )}
        </button>

        <div className="text-xs text-gray-500 font-medium">
          <strong className="text-gray-900 font-bold">{totalResults}</strong> {totalResults === 1 ? "item" : "items"}
        </div>
      </div>

      {/* Main Container - Column on Mobile, Row on Desktop */}
      <div
        className={`${
          isOpenMobile ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100`}
      >
        {/* 1. Price Range Drag Column */}
        <div className="flex flex-col gap-3 w-full md:w-auto min-w-[280px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold text-gray-800">
              Price Range:
            </span>
            <span className="text-xs sm:text-sm font-semibold text-green-700">
              ₦{minVal.toLocaleString()} - ₦{maxVal.toLocaleString()}
            </span>
          </div>

          {/* Dual Range Drag Slider */}
          <div className="relative w-full py-1">
            <div className="relative h-2 bg-gray-200 rounded-lg">
              <div
                className="absolute h-2 bg-green-600 rounded-lg"
                style={{
                  left: `${((minVal - minPriceLimit) / (maxPriceLimit - minPriceLimit)) * 100}%`,
                  right: `${100 - ((maxVal - minPriceLimit) / (maxPriceLimit - minPriceLimit)) * 100}%`,
                }}
              />
            </div>

            <input
              type="range"
              min={minPriceLimit}
              max={maxPriceLimit}
              step="500"
              value={minVal}
              onChange={handleMinChange}
              className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-700 [&::-webkit-slider-thumb]:shadow-md"
            />
            <input
              type="range"
              min={minPriceLimit}
              max={maxPriceLimit}
              step="500"
              value={maxVal}
              onChange={handleMaxChange}
              className="absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-700 [&::-webkit-slider-thumb]:shadow-md"
            />
          </div>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="text-xs text-green-700 hover:text-green-800 font-semibold text-left underline w-fit cursor-pointer"
            >
              Reset Price Range
            </button>
          )}
        </div>

        {/* 2. Total Results Indicator (Desktop Only) */}
        <div className="hidden md:block text-xs sm:text-sm text-gray-500 font-medium text-center">
          Showing <strong className="text-gray-900 font-bold">{totalResults}</strong> {totalResults === 1 ? "product" : "products"}
        </div>

        {/* 3. Sorting Column */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-2">
          <label htmlFor="sort" className="text-xs sm:text-sm font-bold text-gray-800 shrink-0">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto border border-gray-200 rounded-xl text-xs sm:text-sm px-3 py-2.5 bg-gray-50/50 text-gray-800 font-medium outline-none focus:ring-2 focus:ring-green-700 focus:bg-white transition cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="alphabetical">Alphabetical (A - Z)</option>
            <option value="popularity">Popularity / Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterSort;