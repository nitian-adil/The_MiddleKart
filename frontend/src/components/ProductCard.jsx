import { useTranslation } from "react-i18next";

const ProductCard = ({ product, onAdd }) => {
    const { t, i18n } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition p-4">

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />

<h3 className="mt-3 font-semibold text-lg text-black dark:text-white">
          {product.name}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        ₹{product.price}
      </p>

      <button
        onClick={() => onAdd(product._id)}
        className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-300 transition"
      >
       {t("addToCart")}
      </button>
    </div>
  );
};

export default ProductCard;