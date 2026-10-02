import { Link, useParams } from "react-router-dom";
import categories from "../data/categories";
import product from "../data/product";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

function SubcategoryPage() {
  const { categorySlug, subcategorySlug, subcategory } = useParams();

  const targetSub = (subcategorySlug || subcategory || "").toLowerCase();
  const targetCat = (categorySlug || "").toLowerCase();

  let currentSubcategory = null;
  let parentCategory = null;

  for (const cat of categories) {
    if (targetCat && cat.slug?.toLowerCase() !== targetCat) {
      continue;
    }

    const subs = cat.subCategory || cat.subcategory || [];
    const found = subs.find(
      (sub) =>
        sub.slug?.toLowerCase() === targetSub ||
        sub.name?.toLowerCase() === targetSub
    );

    if (found) {
      currentSubcategory = found;
      parentCategory = cat;
      break;
    }
  }

  const matchingProducts = product.filter((p) => {
    const prodSub = (p.subCategory || p.subcategory || "").toLowerCase();
    return (
      prodSub === targetSub ||
      prodSub === currentSubcategory?.name?.toLowerCase() ||
      prodSub === currentSubcategory?.slug?.toLowerCase()
    );
  });

  if (!currentSubcategory) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600">
            Subcategory Not Found
          </h2>
          <Link
            to="/"
            className="text-green-700 font-semibold underline mt-4 inline-block text-sm sm:text-base"
          >
            Go back Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50/50">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {parentCategory && (
            <>
              {" / "}
              <Link
                to={`/${parentCategory.slug}`}
                className="hover:underline capitalize"
              >
                {parentCategory.name}
              </Link>
            </>
          )}
          {" / "}
          <span className="font-semibold text-gray-800 capitalize">
            {currentSubcategory.name}
          </span>
        </nav>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 capitalize mb-6">
          {currentSubcategory.name}
        </h1>

        {matchingProducts.length > 0 ? (
          <ProductGrid products={matchingProducts} />
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center my-6">
            <p className="text-gray-500 text-sm sm:text-base italic">
              No products found in this subcategory.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default SubcategoryPage;