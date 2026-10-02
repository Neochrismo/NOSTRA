import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/food-crops/${category.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
    >
      <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-green-700 transition-colors">
        {category.name}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2">
        Explore {category.name.toLowerCase()} products
      </p>
      <span className="inline-flex items-center gap-1 mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-green-700 group-hover:translate-x-1 transition-transform">
        View products &rarr;
      </span>
    </Link>
  );
}

export default CategoryCard;