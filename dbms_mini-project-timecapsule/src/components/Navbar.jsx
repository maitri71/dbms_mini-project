import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <nav className="bg-zinc-950 border-b border-zinc-800 px-8 py-5 flex justify-between items-center">

      <Link
        to="/"
        className="text-3xl font-bold text-purple-500"
      >
        TimeVault
      </Link>

      <div className="flex gap-6 items-center">

        <Link
          to="/"
          className="text-zinc-300 hover:text-white"
        >
          Home
        </Link>

        {user ? (

          <>
            <Link
              to="/dashboard"
              className="text-zinc-300 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/create-capsule"
              className="text-zinc-300 hover:text-white"
            >
              Create Vault
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              className="text-zinc-300 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-purple-600 px-4 py-2 rounded-xl"
            >
              Register
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;