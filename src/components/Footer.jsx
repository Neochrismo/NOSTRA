// function Footer() {

//   return (
//     <footer className="bg-gray-900 text-white mt-20">

//       <div className="max-w-7xl mx-auto px-4 py-12">

//         <div className="grid md:grid-cols-3 gap-8">

//           <div>
//             <h2 className="text-xl font-bold">
//               AgroMarket
//             </h2>

//             <p className="text-gray-400 mt-3">
//               Connecting agricultural producers
//               with consumers.
//             </p>
//           </div>


//           <div>
//             <h3 className="font-semibold">
//               Marketplace
//             </h3>

//             <ul className="mt-3 space-y-2 text-gray-400">
//               <li>Food Crops</li>
//               <li>Cash Crops</li>
//               <li>Aquatic Products</li>
//               <li>Vegetables</li>
//               <li>Fruits</li>
//             </ul>

//           </div>


//           <div>
//             <h3 className="font-semibold">
//               Support
//             </h3>

//             <ul className="mt-3 space-y-2 text-gray-400">
//               <li>Contact Us</li>
//               <li>Help Center</li>
//               <li>Terms</li>
//               <li>Privacy</li>
//             </ul>

//           </div>

//         </div>

//         <div className="border-t border-gray-700 mt-10 pt-6 text-gray-500">
//           © 2026 NEOCHRISMO
//         </div>

//       </div>

//     </footer>
//   );
// }

// export default Footer;

import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight">AgroMarket</h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Connecting agricultural producers with consumers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
              Marketplace
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li className="hover:text-green-400 cursor-pointer transition">Food Crops</li>
              <li className="hover:text-green-400 cursor-pointer transition">Cash Crops</li>
              <li className="hover:text-green-400 cursor-pointer transition">Aquatic Products</li>
              <li className="hover:text-green-400 cursor-pointer transition">Vegetables</li>
              <li className="hover:text-green-400 cursor-pointer transition">Fruits</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li className="hover:text-green-400 cursor-pointer transition">Contact Us</li>
              <li className="hover:text-green-400 cursor-pointer transition">Help Center</li>
              <li className="hover:text-green-400 cursor-pointer transition">Terms</li>
              <li className="hover:text-green-400 cursor-pointer transition">Privacy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center sm:text-left text-xs text-gray-500">
          © 2026 NEOCHRISMO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;