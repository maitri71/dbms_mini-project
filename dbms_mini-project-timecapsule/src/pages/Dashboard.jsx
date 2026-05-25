import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

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

    const response = await fetch(
      `http://localhost:5000/capsules/${user.id}`
    );

    const data = await response.json();

    setCapsules(data);
  };

  const lockedCapsules = capsules.filter(
    c => new Date(c.unlock_date) > new Date()
  );

  const unlockedCapsules = capsules.filter(
    c => new Date(c.unlock_date) <= new Date()
  );

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white p-8">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            My Vaults
          </h1>

          <p className="text-zinc-400 mt-3">
            Preserve memories for your future self ✨
          </p>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">

            <p className="text-zinc-400">
              Total Vaults
            </p>

            <h2 className="text-5xl font-bold mt-3">
              {capsules.length}
            </h2>

          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">

            <p className="text-zinc-400">
              Locked Vaults
            </p>

            <h2 className="text-5xl font-bold mt-3 text-red-400">
              {lockedCapsules.length}
            </h2>

          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">

            <p className="text-zinc-400">
              Unlocked Vaults
            </p>

            <h2 className="text-5xl font-bold mt-3 text-green-400">
              {unlockedCapsules.length}
            </h2>

          </div>

        </div>

        {/* Button */}
        <Link
          to="/create-capsule"
          className="inline-block mb-10 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-2xl font-bold"
        >
          + Create Vault
        </Link>

        {/* Empty State */}
        {capsules.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-4xl font-bold">
              No Vaults Yet
            </h2>

            <p className="text-zinc-400 mt-4">
              Create your first time capsule ✨
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {capsules.map((capsule) => {

              const isUnlocked =
                new Date(capsule.unlock_date)
                <=
                new Date();

              return (

                <div
                  key={capsule.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
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

        )}

      </div>
    </>
  );
}

export default Dashboard;