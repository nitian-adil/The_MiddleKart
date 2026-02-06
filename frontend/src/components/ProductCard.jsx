const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="mt-3 font-semibold text-lg">
        {product.name}
      </h3>

      <p className="text-gray-600 text-sm mt-1">
        ₹{product.price}
      </p>

      <button
        onClick={() => onAdd(product._id)}
        className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
