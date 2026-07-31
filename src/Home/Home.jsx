import HeroSection from './HeroSection';
import CategoryPreview from './CategoryPreview';
import FoodCrops from '../ProductCards/FoodCrops/FoodCrops';

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryPreview />
      <FoodCrops />
    </div>
  );
}

export default Home;