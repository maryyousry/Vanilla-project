import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import Favorites from "./Components/Favorites";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <Routes>
      {/* Unprotected Routes */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
};

export default App;
