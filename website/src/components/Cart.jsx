import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();
  const API = import.meta.env.VITE_API_URL;

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Cart Items</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
              <img
              src={`${API}${item.imageURL}`}
              alt={item.title}
              className="h-16 w-16 object-cover rounded"
              />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500">{item.salePrice} EGP</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-xl text-right font-semibold">
            Total: {total} EGP
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
