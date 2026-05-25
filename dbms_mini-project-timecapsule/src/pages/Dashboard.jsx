import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const [capsules, setCapsules] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    if (!user) {

      navigate("/login");

      return;
    }

    fetchCapsules();

  }, []);

  const fetchCapsules = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/capsules/${user.id}`
      );

      const data = await response.json();

      setCapsules(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  const unlockedCapsules = capsules.filter(
    (capsule) =>
      new Date(capsule.unlock_date) <= new Date()
  );

  const lockedCapsules = capsules.filter(
    (capsule) =>
      new Date(capsule.unlock_date) > new Date()
  );

  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            My Vaults
          </h1>

          <p className="text-zinc-400 mt-2">
            Welcome back ✨
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <h2 className="text-zinc-400">
            Total Vaults
          </h2>

          <p className="text-4xl font-bold mt-2">
            {capsules.length}
          </p>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <h2 className="text-zinc-400">
            Locked
          </h2>

          <p className="text-4xl font-bold mt-2 text-red-400">
            {lockedCapsules.length}
          </p>

        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <h2 className="text-zinc-400">
            Unlocked
          </h2>

          <p className="text-4xl font-bold mt-2 text-green-400">
            {unlockedCapsules.length}
          </p>

        </div>

      </div>

      {/* CREATE BUTTON */}
      <Link
        to="/create-capsule"
        className="bg-purple-600 px-6 py-4 rounded-2xl inline-block mb-10"
      >
        + Create Vault
      </Link>

      {/* CAPSULES */}
      <div className="grid md:grid-cols-3 gap-8">

        {capsules.map((capsule) => {

          const isUnlocked =
            new Date(capsule.unlock_date)
            <=
            new Date();

          return (

            <div
              key={capsule.id}
              className="bg-zinc-900 rounded-3xl overflow-hidden"
            >

              <img
                src={
                  capsule.image_url ||
                  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
                }
                alt=""
                className={`w-full h-56 object-cover ${
                  !isUnlocked
                    ? "blur-md"
                    : ""
                }`}
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold mb-3">
                  {capsule.title}
                </h2>

                <p className="text-zinc-400 mb-4">

                  {isUnlocked
                    ? capsule.message
                    : "This vault is locked 🔒"}

                </p>

                <p className="text-purple-400 mb-4">

                  Unlock:
                  {" "}
                  {new Date(
                    capsule.unlock_date
                  ).toLocaleString()}

                </p>

                <div
                  className={`font-bold ${
                    isUnlocked
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {isUnlocked
                    ? "Unlocked"
                    : "Locked"}

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Dashboard;