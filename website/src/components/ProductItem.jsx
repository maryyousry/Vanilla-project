import React from "react";

function ProductItem({ item, onQtyChange, onRemove }) {
  const { id, title, category, color, price, salePrice, imageURL, quantity } = item;

  return (
    <div className="bg-white p-4 rounded-lg shadow flex">
      <img
        src={imageURL}
        alt={title}
        className="w-32 h-32 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">Category: {category}</p>
        <p className="text-sm text-gray-600">Color: {color}</p>
        <p className="text-sm text-gray-800 mt-2">
          Price: <span className="line-through">{price}</span> <strong>{salePrice} EGP</strong>
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQtyChange(id, -1)}
              className="px-3 py-1 text-lg bg-red-200 rounded"
            >
              -
            </button>
            <span className="text-xl font-medium">{quantity}</span>
            <button
              onClick={() => onQtyChange(id, 1)}
              className="px-3 py-1 text-lg bg-green-200 rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
