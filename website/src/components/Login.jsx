import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleLogin = (e) => {
    e.preventDefault();

    const savedUsername = localStorage.getItem("userName");
    const savedPassword = localStorage.getItem("password");

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      savedUsername?.trim() === username.trim() &&
      savedPassword?.trim() === password.trim()
    ) {
      localStorage.setItem("user", JSON.stringify({ username }));
      alert("Login successful!");
      navigate("/shop"); 
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-5"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
