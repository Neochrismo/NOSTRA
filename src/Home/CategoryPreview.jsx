import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryPreviews from './Categories';

const ACCESS_KEY = 'GbbmBW3YZQRpr3y6IiQYQr4TmlV1i1axiEtq4pNWrkY';

function CategoryPreview() {
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCategoryImages() {
      try {
        const categoryRequests = categoryPreviews.map(async (category) => {
          const imageRequests = category.sampleQueries.map((query) =>
            fetch(
              `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
              { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } }
            )
              .then((res) => res.json())
              .then((data) => ({
                url: data.results[0]?.urls?.small || '',
                label: query,
              }))
          );

          const images = await Promise.all(imageRequests);
          return { ...category, images };
        });

        const results = await Promise.all(categoryRequests);
        setCategoriesWithImages(results);
      } catch (error) {
        console.error('Error fetching category preview images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllCategoryImages();
  }, []);

  if (loading) return <div className="text-center py-8">Loading categories...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {categoriesWithImages.map((category) => (
        <div key={category.slug}>

          {/* Section header bar — like "Top Sellers" */}
          <div className="flex justify-between items-center bg-green-600 px-4 py-2 rounded-t">
            <h2 className="text-white font-semibold text-lg">{category.name}</h2>
            <Link
              to={`/category/${category.slug}`}
              className="text-white text-sm hover:underline"
            >
              See All &gt;
            </Link>
          </div>

          {/* Horizontal scroll row of product cards */}
          <div className="flex gap-4 overflow-x-auto border border-t-0 rounded-b p-4 bg-white">
            {category.images.map((img, sampleQueries) => (
              <Link
                key={sampleQueries}
                to={`/category/${category.slug}`}
                className="flex-shrink-0 w-40 border rounded hover:shadow-md transition"
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-32 object-cover rounded-t"
                />
                <p className="text-sm text-center py-2 capitalize">{img.label}</p>
              </Link>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

export default CategoryPreview;