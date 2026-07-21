import { useState, useEffect } from 'react';
import demoCereals from '../ProductDetails';
import CerealCard from '../DisplayCard';

const ACCESS_KEY ='GbbmBW3YZQRpr3y6IiQYQr4TmlV1i1axiEtq4pNWrkY';

function CerealsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=cereal crops&per_page=${demoCereals.length}`,
          { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } }
        );
        const data = await res.json();

        const merged = demoCereals.map((item, index) => ({
          ...item,
          image: data.results[index]?.urls?.regular || '',
          photographer: data.results[index]?.user?.name || '',
          photographerLink: data.results[index]?.user?.links?.html || '',
        }));

        setProducts(merged);
      } catch (error) {
        console.error('Error fetching cereal images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Cereals</h1>
      <p className="text-sm text-gray-500 mb-6">
        Sample listing format — seller-provided details will appear once submitted.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <CerealCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CerealsPage;