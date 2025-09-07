import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";

// Load API from .env (must be prefixed with VITE_)
const API = import.meta.env.VITE_API_URL;

export default function Shop() {
  const { cart, addToCart, removeFromCart, cartQty, total, increaseQty, decreaseQty } = useCart();

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]); // store productIds
  const [searchMode, setSearchMode] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [online, setOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(true);

  // Load products & favorites
  useEffect(() => {
    const load = async () => {
      try {
        const prodRes = await fetch(`${API}/products`);
        const prodData = await prodRes.json();

        // try loading favorites (optional if API exists)
        let favData = [];
        try {
          const favRes = await fetch(`${API}/favorites`);
          favData = await favRes.json();
        } catch {
          favData = [];
        }

        setProducts(prodData);
        setFavorites(favData.map(f => f.id));
      } catch (e) {
        console.error("Load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Toggle favorite (add/remove)
  const toggleFavorite = async (productId) => {
    try {
      if (favorites.includes(productId)) {
        await fetch(`${API}/favorites/${productId}`, { method: "DELETE" });
        setFavorites(prev => prev.filter(id => id !== productId));
      } else {
        await fetch(`${API}/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: productId })
        });
        setFavorites(prev => [...prev, productId]);
      }
    } catch (e) {
      console.error("Favorite error:", e);
    }
  };

  // Search filter
  const filteredProducts = products.filter((item) =>
    (item[searchMode] || "").toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* cart icon */}
      <div className="flex justify-end mb-6">
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl text-blue-600" />
          {cartQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartQty}
            </span>
          )}
        </Link>
      </div>



      {/* search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-auto"
        >
          <option value="title">Search by Title</option>
          <option value="category">Search by Category</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchMode}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
      </div>

      {/* product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => {
            const isFav = favorites.includes(item.id);
            const inCart = cart.find((c) => c.id === item.id);
            let heightImage =
              item.category === "phone"
                ? "h-[330px]"
                : item.category === "smart watch"
                ? "h-[240px]"
                : "h-[200px]";

            return (
              <div
                key={item.id}
                className="bg-white border border-blue-300 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className={`w-4/5 mx-auto object-contain mt-4 ${heightImage}`}
                />
                <div className="p-4">
                  <p className="font-semibold text-sm sm:text-base">
                    Product: {item.title}
                  </p>
                  <p className="text-gray-600 text-sm">Category: {item.category}</p>
                  <p className="text-gray-500 text-sm">Color: {item.color}</p>
                  <p className="mt-2 text-sm">
                    <span className="line-through text-gray-400">{item.price} EGP</span>{" "}
                    <span className="text-blue-600 font-bold">{item.salePrice} EGP</span>
                  </p>
                </div>
                <div className="flex justify-between items-center px-4 pb-4">
                  {!inCart ? (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-700"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  )}

                  {isFav ? (
                    <FaHeart
                      className="text-lg text-red-500 cursor-pointer"
                      onClick={() => toggleFavorite(item.id)}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-lg text-gray-400 cursor-pointer"
                      onClick={() => toggleFavorite(item.id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* cart summary */}
        <div className="border rounded-lg p-4 shadow bg-gray-50 h-fit">
          <h4 className="text-lg font-semibold mb-3">Cart ({cartQty} items)</h4>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 sm:grid-cols-4 items-center mb-3 text-sm gap-2"
              >
                <span className="font-medium">{item.title}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-red-200 text-red-600 rounded hover:bg-red-300"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="px-2 py-1 bg-green-200 text-green-600 rounded hover:bg-green-300"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold col-span-1 sm:col-span-1 text-right">
                  {Number(item.salePrice) * item.qty} EGP
                </span>
              </div>
            ))
          )}
          <h5 className="text-xl font-bold mt-4">Total: {total} EGP</h5>
        </div>
      </div>
    </div>
  );
}
