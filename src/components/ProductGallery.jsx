function ProductGallery({ product }) {
  return (
    <div className="w-full">
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-100 p-2 sm:p-4 flex items-center justify-center">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-contain object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

export default ProductGallery;