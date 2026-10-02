function SellerInfo({ product }) {

  return (
    <section className="border rounded-xl p-6">

      <h2 className="text-xl font-bold">
        Seller Information
      </h2>

      <div className="mt-4">

        <p className="font-semibold">
          {product.seller}
        </p>

        <p className="text-gray-500">
          {product.sellerLocation}
        </p>

      </div>

      <button className="mt-4 border px-5 py-2 rounded-lg">
        View Seller
      </button>

    </section>
  );
}

export default SellerInfo;