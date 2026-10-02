import { Link, useParams } from "react-router-dom";
import categories from "../data/categories";
import products from "../data/product";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import React, { useMemo, useState } from "react";
import ProductFilterSort from "../components/ProductFilterSort";

function CategoryPage({ categoryName }) {
  const { categorySlug } = useParams();

  const targetCategory = (categorySlug || categoryName || "").toLowerCase();
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(50000);

  const categoryProducts = useMemo(() => {
    return products.filter(
      (p) => p.category?.toLowerCase() === categorySlug?.toLowerCase()
    );
  }, [categorySlug]);

  const processedProducts = useMemo(() => {
    let result = categoryProducts.filter((item) => item.price <= priceRange);

    switch (sortBy) {
      case "price-low-high":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high-low":
        return [...result].sort((a, b) => b.price - a.price);
      case "alphabetical":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case "popularity":
        return [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return result;
    }
  }, [categoryProducts, priceRange, sortBy]);

  const currentCategory = categories.find(
    (cat) =>
      cat.slug?.toLowerCase() === targetCategory ||
      cat.name?.toLowerCase() === targetCategory ||
      cat.slug?.toLowerCase() === targetCategory.replace(/\s+/g, "-")
  );

  if (!currentCategory) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600">
            Category Not Found
          </h2>
          <Link
            to="/"
            className="text-green-700 font-semibold underline mt-4 inline-block text-sm sm:text-base"
          >
            Return Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const subcategoriesList =
    currentCategory.subCategory || currentCategory.subcategory || [];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50/50">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <span className="font-semibold text-gray-800 capitalize">
            {currentCategory.name}
          </span>
        </nav>

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 capitalize mb-4 sm:mb-6">
          {currentCategory.name} Products
        </h1>

        {/* Filter & Sorting Header Bar */}
        <ProductFilterSort
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPriceLimit={50000}
          totalResults={processedProducts.length}
        />

        {/* Filtered Product Grid or Empty State */}
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 my-6 sm:my-8">
            {processedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 sm:py-16 bg-white rounded-xl border border-gray-200 my-6">
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              No products match the selected price range (₦
              {priceRange.toLocaleString()}).
            </p>
            <button
              onClick={() => {
                setPriceRange(50000);
                setSortBy("default");
              }}
              className="mt-3 text-green-700 font-bold hover:underline text-xs sm:text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Subcategories Sections */}
        <div className="mt-10 sm:mt-12 space-y-8 sm:space-y-12">
          {subcategoriesList.map((sub) => {
            const subSlug =
              sub.slug || sub.name?.toLowerCase().replace(/\s+/g, "-");

            const subProducts = products.filter(
              (p) =>
                p.subCategory?.toLowerCase() === subSlug ||
                p.subCategory?.toLowerCase() === sub.name?.toLowerCase() ||
                p.subcategory?.toLowerCase() === subSlug ||
                p.subcategory?.toLowerCase() === sub.name?.toLowerCase()
            );

            if (subProducts.length === 0) return null;

            return (
              <ProductSection
                key={subSlug}
                title={sub.name}
                products={subProducts.slice(0, 5)}
                viewAllLink={`/${currentCategory.slug}/${subSlug}`}
              />
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CategoryPage;