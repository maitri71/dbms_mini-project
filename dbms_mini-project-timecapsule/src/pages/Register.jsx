import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/register",
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

      alert(data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Server Error");
    }
  };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center">

      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-10 rounded-3xl w-96"
      >

        <h1 className="text-4xl text-white font-bold mb-8">
          Register
        </h1>

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
          className="w-full bg-purple-600 p-4 rounded-xl text-white font-bold"
        >
          Register
        </button>

        <p className="text-zinc-400 mt-6">

          Already have account?{" "}

          <Link
            to="/login"
            className="text-purple-400"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;