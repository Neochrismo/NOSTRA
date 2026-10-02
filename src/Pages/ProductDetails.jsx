// import { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

// import products from "../data/product";
// import ProductGallery from "../components/ProductGallery";
// import ProductInfo from "../components/ProductInfo";
// import SellerInfo from "../components/SellerInfo";
// import Footer from "../components/Footer";
// import ProductGrid from "../components/ProductGrid";
// import SEO from "../components/SEO";

// function ProductDetails() {
//   const { productId } = useParams();

//   // Find product by ID
//   const product = products.find(
//     (item) => String(item.id) === String(productId)
//   );

//   // 1. Read directly from localStorage on render
//   const recentlyViewed = (() => {
//     try {
//       const saved = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
//       return saved.filter((item) => String(item.id) !== String(productId));
//     } catch {
//       return [];
//     }
//   })();

//   // 2. Pure Side-Effect: Save current product to localStorage (No state updates here!)
//   useEffect(() => {
//     if (!products) return;

//     try {
//       const savedList = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

//       // Remove current product to avoid duplicates
//       const filteredList = savedList.filter(
//         (item) => String(item.id) !== String(product.id)
//       );

//       // Add current product to the top (max 6 items)
//       const updatedList = [product, ...filteredList].slice(0, 6);

//       localStorage.setItem("recentlyViewed", JSON.stringify(updatedList));
//     } catch (error) {
//       console.error("Failed to update localStorage:", error);
//     }
//     // Scroll to top whenever the active product ID changes
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [product]);

//   // Handle missing product
//   if (!product) {
//     return (
//       <>
//         <main className="max-w-7xl mx-auto px-4 py-20">
//           <h1 className="text-3xl font-bold">Product not found</h1>
//           <Link to="/" className="text-green-700 mt-4 inline-block">
//             Return home
//           </Link>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   // Related products
//   const productSub = (product.subcategory || product.subCategory || "").toLowerCase();
//   const productCat = (product.category || "").toLowerCase();

//   const relatedProducts = products
//     .filter((item) => {
//       const itemSub = (item.subcategory || item.subCategory || "").toLowerCase();
//       const itemCat = (item.category || "").toLowerCase();

//       const isSameSub = productSub && itemSub === productSub;
//       const isSameCat = productCat && itemCat === productCat;

//       return (isSameSub || isSameCat) && String(item.id) !== String(product.id);
//     })
//     .slice(0, 4);

//   return (
//     <>
//     <SEO
//         title={product.name}
//         description={`Buy ${product.name} online for ₦${product.price.toLocaleString()}. Top quality guaranteed.`}
//         image={product.image}
//         url={`/products/${product.id}`}
//         type="product"
//       />
//       <main className="max-w-7xl mx-auto px-4 py-10">
//         {/* BREADCRUMB */}
//         <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
//           <Link to="/" className="hover:underline">
//             Home
//           </Link>
//           <span className="mx-2">/</span>
//           <Link
//             to={`/${product.category?.toLowerCase().replace(/\s+/g, "-")}`}
//             className="hover:underline capitalize"
//           >
//             {product.category}
//           </Link>
//           <span className="mx-2">/</span>
//           <span className="font-medium text-gray-800">{product.name}</span>
//         </div>

//         {/* PRODUCT OVERVIEW */}
//         <div className="grid lg:grid-cols-2 gap-10">
//           <ProductGallery product={product} />
//           <ProductInfo product={product} />
//         </div>

//         {/* DESCRIPTION */}
//         <section className="mt-14">
//           <h2 className="text-2xl font-bold">Product Description</h2>
//           <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
//             {product.description || "No description provided for this product."}
//           </p>
//         </section>

//         {/* SELLER INFO */}
//         <section className="mt-10">
//           <SellerInfo product={product} />
//         </section>

//         {/* REVIEWS PLACEHOLDER */}
//         <section className="mt-10 border rounded-xl p-6">
//           <h2 className="text-2xl font-bold">Customer Reviews</h2>
//           <p className="text-gray-500 mt-3">No reviews yet.</p>
//         </section>

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <section className="mt-14">
//             <h2 className="text-2xl font-bold mb-5">You may also like</h2>
//             <ProductGrid products={relatedProducts} />
//           </section>
//         )}

//         {/* RECENTLY VIEWED PRODUCTS */}
//         {recentlyViewed.length > 0 && (
//           <section className="mt-14 border-t pt-10">
//             <h2 className="text-2xl font-bold mb-5">Recently Viewed</h2>
//             <ProductGrid products={recentlyViewed} />
//           </section>
//         )}
//       </main>

//       <Footer />
//     </>
//   );
// }

// export default ProductDetails;

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import products from "../data/product";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import SellerInfo from "../components/SellerInfo";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import SEO from "../components/SEO";

function ProductDetails() {
  const { productId } = useParams();

  // Find product by ID
  const product = products.find(
    (item) => String(item.id) === String(productId)
  );

  // 1. Read directly from localStorage on render
  const recentlyViewed = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      return saved.filter((item) => String(item.id) !== String(productId));
    } catch {
      return [];
    }
  })();

  // 2. Pure Side-Effect: Save current product to localStorage
  useEffect(() => {
    if (!product) return;

    try {
      const savedList =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];

      // Remove current product to avoid duplicates
      const filteredList = savedList.filter(
        (item) => String(item.id) !== String(product.id)
      );

      // Add current product to the top (max 6 items)
      const updatedList = [product, ...filteredList].slice(0, 6);

      localStorage.setItem("recentlyViewed", JSON.stringify(updatedList));
    } catch (error) {
      console.error("Failed to update localStorage:", error);
    }
    // Scroll to top whenever the active product ID changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  // Handle missing product
  if (!product) {
    return (
      <>
        <SEO title="Product Not Found" description="The requested product could not be found." />
        <main className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <Link to="/" className="text-green-700 mt-4 inline-block hover:underline">
            Return home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Related products logic
  const productSub = (
    product.subcategory ||
    product.subCategory ||
    ""
  ).toLowerCase();
  const productCat = (product.category || "").toLowerCase();

  const relatedProducts = products
    .filter((item) => {
      const itemSub = (
        item.subcategory ||
        item.subCategory ||
        ""
      ).toLowerCase();
      const itemCat = (item.category || "").toLowerCase();

      const isSameSub = productSub && itemSub === productSub;
      const isSameCat = productCat && itemCat === productCat;

      return (isSameSub || isSameCat) && String(item.id) !== String(product.id);
    })
    .slice(0, 4);

  // Construct JSON-LD Schema.org Structured Data
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image ? [product.image] : [],
    "description": product.description || `Buy ${product.name} online at top quality.`,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NGN",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "url": window.location.href,
    },
  };

  return (
    <>
      <SEO
        title={product.name}
        description={`Buy ${product.name} online for ₦${product.price?.toLocaleString()}. Top quality guaranteed.`}
        image={product.image}
        url={`/products/${product.id}`}
        type="product"
        schema={productSchema}
      />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link
            to={`/${product.category?.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:underline capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-800 line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* PRODUCT OVERVIEW */}
        <div className="grid lg:grid-cols-2 gap-10">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* DESCRIPTION */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">Product Description</h2>
          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
            {product.description || "No description provided for this product."}
          </p>
        </section>

        {/* SELLER INFO */}
        <section className="mt-10">
          <SellerInfo product={product} />
        </section>

        {/* REVIEWS PLACEHOLDER */}
        <section className="mt-10 border rounded-xl p-6">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <p className="text-gray-500 mt-3">No reviews yet.</p>
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-5">You may also like</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}

        {/* RECENTLY VIEWED PRODUCTS */}
        {recentlyViewed.length > 0 && (
          <section className="mt-14 border-t pt-10">
            <h2 className="text-2xl font-bold mb-5">Recently Viewed</h2>
            <ProductGrid products={recentlyViewed} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;