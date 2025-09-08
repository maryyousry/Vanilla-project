import { useEffect, useState } from "react";


export default function Favorites() {
  const [favorites, setFavorites] = useState([]);       // productIds
  const [products, setProducts] = useState([]);         // all products
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, favRes] = await Promise.all([
          fetch(`${API}/products`),
          fetch(`${API}/favorites`)
        ]);
        const [prodData, favData] = await Promise.all([
          prodRes.json(),
          favRes.json()
        ]);
        setProducts(prodData);
        setFavorites(favData.map(f => f.id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const removeFromFavorites = async (productId) => {
    try {
      await fetch(`${API}/favorites/${productId}`, { method: "DELETE" });
      setFavorites(prev => prev.filter(id => id !== productId));
    } catch (e) {
      console.error(e);
    }
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <section className="mt-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">❤️ Favorites</h2>
      {favoriteProducts.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col"
            >
              <img
              src={`${API}${item.imageURL}`}
              alt={item.title}
              className="h-16 w-16 object-cover rounded"
              />
              <p className="font-semibold text-lg truncate">{item.title}</p>
              <p className="text-sm text-gray-600">{item.category}</p>
              <div className="mt-auto">
                <button
                  onClick={() => removeFromFavorites(item.id)}
                  className="text-red-600 font-medium mt-3 hover:underline"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
