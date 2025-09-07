import { useState, useEffect } from "react";

export default function Header() {
  const [userName, setUserName] = useState(() => localStorage.getItem("userName"));

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  const logOut = () => {
    localStorage.clear();
    setUserName(null);
    setTimeout(() => {
      window.location.href = "/"; // redirect to home
    }, 500);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
      {!userName && (
        <nav id="links" className="flex gap-4">
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </nav>
      )}

      {userName && (
        <div id="userInfo" className="flex items-center gap-4">
          <span id="user" className="font-semibold">
            Welcome {userName}
          </span>
          <button
            id="logOut"
            onClick={logOut}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
