import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const response = await fetch(
        "http://localhost:5000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        navigate("/dashboard");

      } else {

        setError("Invalid email or password");
      }

    } catch (error) {

      setError("Server Error");

    } finally {

      setLoading(false);
    }
  };

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-black flex justify-center items-center px-6">

        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-md"
        >

          <h1 className="text-5xl text-white font-bold mb-3">
            Login
          </h1>

          <p className="text-zinc-400 mb-8">
            Access your future memories ✨
          </p>

          {error && (

            <p className="text-red-500 mb-4">
              {error}
            </p>

          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 mb-6 rounded-xl bg-zinc-800 text-white"
          />

          <button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl text-white font-bold hover:scale-[1.02] transition"
          >

            {loading ? "Loading..." : "Login"}

          </button>

          <p className="text-zinc-400 mt-6">

            Don’t have account?{" "}

            <Link
              to="/register"
              className="text-purple-400"
            >
              Register
            </Link>

          </p>

        </form>

      </div>
    </>
  );
}

export default Login;