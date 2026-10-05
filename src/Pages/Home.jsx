import products from "../data/product";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";

function Home() {

  // FOOD CROPS
  const foodCrops = products.filter(
    (product) =>
      product.category === "food-crops" || product.category === "Food Crops"
  );

  // CASH CROPS
  const cashCrops = products.filter(
    (product) =>
      product.category === "cash-crops" || product.category === "cash Crops"
  );

  // AQUATIC PRODUCTS
  const aquaticProducts = products.filter(
    (product) =>
      product.category === "aquatic-products"
  );

  // VEGETABLES
  const vegetables = products.filter(
    (product) =>
      product.category === "vegetables"
  );

  // FRUITS
  const fruits = products.filter(
    (product) =>
      product.category === "fruits"
  );
  const animatedProducts = products.filter(
    (product) =>
      product.category === "animated-products"
  );
  const forestProducts = products.filter(
    (product) =>
      product.category === "forest-products"
  );

  return (
    <>
    <SEO
        title="Fresh Produce & Groceries Online"
        description="Buy fresh farm produce and daily essentials online with quick delivery."
        url="/"
      />

      <main>

        {/* <Hero /> */}
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4">

          {/* FOOD CROPS */}

          <ProductSection
            title="Food Crops"
            products={foodCrops.slice(0, 8)}
            viewAllLink="/food-crops"
          />


          {/* CASH CROPS */}

          <ProductSection
            title="Cash Crops"
            products={cashCrops.slice(0, 5)}
            viewAllLink="/cash-crops"
          />


          {/* AQUATIC */}

          <ProductSection
            title="Aquatic Products"
            products={aquaticProducts.slice(0, 5)}
            viewAllLink="/aquatic-products"
          />
          {/* ANIMATED PRODUCTS */}

          <ProductSection
            title="Animal Products"
            products={animatedProducts.slice(0, 5)}
            viewAllLink="/animal-products"
          />

          {/* VEGETABLES */}

          <ProductSection
            title="Vegetables"
            products={vegetables.slice(0, 5)}
            viewAllLink="/vegetables"
          />
          <ProductSection
            title="Forest Products"
            products={forestProducts.slice(0, 5)}
            viewAllLink="/forest-products"
          />


          {/* FRUITS */}

          <ProductSection
            title="Fruits"
            products={fruits.slice(0, 5)}
            viewAllLink="/fruits"
          />


        </div>

      </main>

      <Footer />

    </>
  );
}

export default Home;