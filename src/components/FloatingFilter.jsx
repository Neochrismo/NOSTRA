// import { useState } from "react";
// import FilterModal from "./FilterModal";

// function FloatingFilter() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Sticky Right Floating Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         aria-label="Open filter menu"
//         className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-green-700 text-white p-3 rounded-l-2xl shadow-xl hover:bg-green-800 hover:pl-4 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
//       >
//         <svg
//           className="w-6 h-6 group-hover:scale-110 transition-transform"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//           />
//         </svg>
//         <span className="hidden md:inline text-xs font-semibold pr-1">
//           Filter
//         </span>
//       </button>

//       {/* Filter Modal */}
//       <FilterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
//     </>
//   );
// }

// export default FloatingFilter;

import { useState } from "react";
import FilterModal from "./FilterModal";

function FloatingFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sticky Floating Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open filter menu"
        className="fixed right-0 bottom-20 md:top-1/2 md:-translate-y-1/2 z-40 bg-green-700 text-white p-3 rounded-l-2xl shadow-xl hover:bg-green-800 hover:pl-4 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
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
        <span className="hidden md:inline text-xs font-semibold pr-1">
          Filter
        </span>
      </button>

      {/* Filter Modal Sheet */}
      <FilterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default FloatingFilter;