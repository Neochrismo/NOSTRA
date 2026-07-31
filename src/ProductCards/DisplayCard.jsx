import { Link } from "react-router-dom";
function Field({ label, value }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{' '}
      {value ? (
        value
      ) : (
        <span className="text-gray-400 italic">Not yet provided</span>
      )}
    </p>
  );
}

function DisplayCard({ product }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <Link
        to={`/product/${product.id}`}
        className="block border rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition"
      >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm italic text-gray-500 mb-2">{product.scientificName}</p>

            <div className="text-sm space-y-1 mb-3">
              <Field label="Local name" value={product.localName} />
              <Field label="Location" value={product.location} />
              <Field label="Grade" value={product.grade} />
              <Field label="State" value={product.state} />
              <Field label="Harvested" value={product.dateHarvested} />
            </div>
          </div>
      </Link>
        <div>
          {product.sellerContact ? (
          <a
            href={`tel:${product.sellerContact}`}
            className="block bg-green-600 text-white text-center py-2 rounded hover:bg-green-700"
          >
            Contact Seller
          </a>
        ) : (
          <button
            disabled
            className="block w-full bg-gray-300 text-gray-500 text-center py-2 rounded cursor-not-allowed"
          >
            Seller contact not available
          </button>
        )}

        {product.photographer && (
          <p className="text-xs text-gray-400 mt-2">
            Photo by{' '}
            <a href={product.photographerLink} target="_blank" rel="noreferrer">
              {product.photographer}
            </a>{' '}
            on <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default DisplayCard;