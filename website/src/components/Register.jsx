import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if already logged in, redirect to home
    if (localStorage.getItem("user")) {
      navigate("/");
    }
    const input = document.getElementById("userName");
    if (input) input.focus();
  }, [navigate]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Register
        </h2>

        <input
          id="userName"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
