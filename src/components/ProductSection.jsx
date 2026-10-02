import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductSection({ title, products, viewAllLink }) {
  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
          {title}
        </h2>

        <Link
          to={viewAllLink}
          className="text-xs sm:text-sm font-semibold text-green-700 hover:text-green-800 hover:underline shrink-0"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;