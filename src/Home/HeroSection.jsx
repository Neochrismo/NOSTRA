// HeroSection.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ACCESS_KEY = 'GbbmBW3YZQRpr3y6IiQYQr4TmlV1i1axiEtq4pNWrkY';
const QUERIES = ['tomato', 'yam', 'pepper'];

const CATEGORIES = [
  'Food Crops',
  'Cash Crops',
  'Animal Products',
  'Aquatic/Marine Products',
  'Forest Products',
  'Ornamental & Horticultural Products',
  'By-products',
];

function HeroSection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      const requests = QUERIES.map((query) =>
        fetch(
          `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
          { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } }
        ).then((res) => res.json())
      );
      const results = await Promise.all(requests);
      setImages(results.map((data) => data.results[0]).filter(Boolean));
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

  if (images.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row w-full">

      {/* LEFT SIDE — categories (desktop only) */}
      <div className="hidden lg:flex lg:w-1/5 flex-col gap-3 p-4">
        <h3 className="font-bold text-lg mb-2">Categories</h3>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm hover:text-green-600"
          >
            {category}
          </Link>
        ))}
      </div>

      {/* CENTER — carousel */}
      <div className="w-full lg:w-3/5 relative h-[250px] sm:h-[320px] lg:h-[300px] overflow-hidden">
        <img
          src={`${images[currentIndex].urls.raw}&w=800&h=600&fit=crop`}
          alt={images[currentIndex].alt_description}
          className=" absolute inset-0 w-full h-[400px] lg:h-[300px] object-cover"
        />
        <p className="text-xs mt-1 text-center">
          Photo by{' '}
          <a href={images[currentIndex].user.links.html} target="_blank" rel="noreferrer">
            {images[currentIndex].user.name}
          </a>{' '}
          on <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a>
        </p>
      </div>

      {/* RIGHT SIDE — actions (desktop only) */}
      <div className="hidden lg:flex lg:w-1/5 flex-col gap-4 p-4">
        <Link
          to="/sell"
          className="bg-green-600 text-white text-center py-2 rounded"
        >
          Sell
        </Link>
        <Link
          to="/orders"
          className="border border-green-600 text-green-600 text-center py-2 rounded"
        >
          Check Order Progress
        </Link>
      </div>

    </div>
  );
}

export default HeroSection;