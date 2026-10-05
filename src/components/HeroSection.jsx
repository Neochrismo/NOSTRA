import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categories from '../data/categories';

const ACCESS_KEY = 'GbbmBW3YZQRpr3y6IiQYQr4TmlV1i1axiEtq4pNWrkY';
const QUERIES = ['tomato', 'yam', 'pepper'];

function HeroSection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const requests = QUERIES.map((query) =>
          fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
            { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } }
          ).then((res) => res.json())
        );
        const results = await Promise.all(requests);
        setImages(results.map((data) => data.results?.[0]).filter(Boolean));
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    }
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="w-full max-w-7xl mx-auto my-2 sm:my-4 px-2 sm:px-4">
      <div className="flex flex-col lg:flex-row w-full rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        {/* LEFT SIDE — Categories (Desktop Only - Hidden on Mobile) */}
        <div
          className="hidden lg:block lg:w-1/4 relative p-4 bg-white z-20 border-r border-gray-100"
          onMouseLeave={() => setActiveCategory(null)}
        >
          <h3 className="font-bold text-base mb-3 text-gray-800 border-b pb-2">
            Categories
          </h3>

          <ul className="flex flex-col gap-1.5">
            {categories.map((cat) => (
              <li
                key={cat.slug}
                onMouseEnter={() => setActiveCategory(cat)}
                className="relative group"
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className={`flex justify-between items-center text-xs xl:text-sm py-1.5 px-2 rounded transition-colors ${
                    activeCategory?.slug === cat.slug
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-gray-400 group-hover:text-green-600">
                    &rsaquo;
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Subcategories Flyout Menu */}
          {activeCategory && (
            <div className="absolute top-0 left-full w-60 bg-white shadow-xl border border-gray-200 rounded-r-xl p-4 min-h-full z-30">
              <div className="mb-3 border-b pb-2">
                <Link
                  to={`/category/${activeCategory.slug}`}
                  className="font-bold text-green-700 hover:underline text-xs xl:text-sm block"
                >
                  All {activeCategory.name} &rarr;
                </Link>
              </div>

              <div className="flex flex-col gap-1.5">
                {(activeCategory.subCategory || []).map((sub) => (
                  <Link
                    key={sub.slug}
                    to={`/category/${activeCategory.slug}/${sub.slug}`}
                    className="text-xs text-gray-600 hover:text-green-600 hover:underline py-1"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CENTER — Image Carousel (Full width on Mobile) */}
        <div className="w-full lg:w-2/4 relative aspect-[16/9] sm:h-[320px] lg:h-[360px] bg-gray-100 flex flex-col justify-between overflow-hidden">
          {images.length > 0 ? (
            <>
              <div className="relative w-full h-full">
                <img
                  src={`${images[currentIndex]?.urls?.raw}&w=800&h=600&fit=crop`}
                  alt={images[currentIndex]?.alt_description || 'Hero Image'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
              <p className="absolute bottom-0 inset-x-0 text-[10px] sm:text-[11px] py-1 text-center bg-black/40 text-white backdrop-blur-xs">
                Photo by{' '}
                <a
                  href={images[currentIndex]?.user?.links?.html}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-green-300"
                >
                  {images[currentIndex]?.user?.name}
                </a>{' '}
                on{' '}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-green-300"
                >
                  Unsplash
                </a>
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xs sm:text-sm">
              Loading hero banner...
            </div>
          )}
        </div>

        {/* RIGHT SIDE — Action Links (Desktop Only - Hidden on Mobile) */}
        <div className="hidden lg:flex w-full lg:w-1/4 p-3 sm:p-4 bg-white border-t lg:border-t-0 lg:border-l border-gray-100 flex-row lg:flex-col justify-center gap-3">
          <Link
            to="/sell"
            className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700 text-white font-medium text-center py-2.5 rounded-lg transition-colors shadow-xs text-xs sm:text-sm"
          >
            Sell Products
          </Link>
          <Link
            to="/orders"
            className="flex-1 lg:flex-none border border-green-600 text-green-600 hover:bg-green-50 font-medium text-center py-2.5 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Track Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;