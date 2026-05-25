import { useEffect, useState } from "react";
import LiveClock from "../components/LiveClock";
import { Link, useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/ParticlesBackground";
import Navbar from "../components/Navbar";

import confetti from "canvas-confetti";

import Countdown from "react-countdown";

import { motion } from "framer-motion";

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

  const triggerConfetti = () => {

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  const lockedCapsules = capsules.filter(
    c => new Date(c.unlock_date) > new Date()
  );

  const unlockedCapsules = capsules.filter(
    c => new Date(c.unlock_date) <= new Date()
  );

  return (

    <>
      <ParticlesBackground />
      <Navbar />
      <LiveClock />

      <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />

        {/* Header */}
        <div className="relative z-10 mb-12">

          <h1 className="text-6xl font-extrabold mb-3">

            Welcome Back ✨

          </h1>

          <p className="text-zinc-400 text-lg">

            Preserve your future memories inside digital vaults.

          </p>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 relative z-10">

          {[

            {
              title: "Total Vaults",
              value: capsules.length,
              color: "from-purple-600 to-pink-600"
            },

            {
              title: "Locked",
              value: lockedCapsules.length,
              color: "from-red-500 to-orange-500"
            },

            {
              title: "Unlocked",
              value: unlockedCapsules.length,
              color: "from-green-500 to-emerald-500"
            }

          ].map((card, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className={`bg-gradient-to-br ${card.color} p-8 rounded-3xl shadow-2xl`}
            >

              <p className="text-white/80 text-lg">
                {card.title}
              </p>

              <h2 className="text-6xl font-extrabold mt-4">
                {card.value}
              </h2>

            </motion.div>

          ))}

        </div>

        {/* Create Button */}
        <Link
          to="/create-capsule"
          className="inline-block mb-12 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition relative z-10"
        >
          + Create New Vault
        </Link>

        {/* Empty State */}
        {capsules.length === 0 ? (

          <div className="text-center mt-20 relative z-10">

            <h2 className="text-5xl font-bold">
              No Vaults Yet
            </h2>

            <p className="text-zinc-400 mt-5 text-lg">
              Create your first futuristic memory capsule 🚀
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-8 relative z-10">

            {capsules.map((capsule) => {

              const isUnlocked =
                new Date(capsule.unlock_date)
                <=
                new Date();

              return (

                <motion.div
                  whileHover={{ y: -10 }}
                  key={capsule.id}
                  className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                >

                  <div className="overflow-hidden">

                    <img
                      src={
                        capsule.image_url ||
                        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
                      }
                      alt=""
                      className={`w-full h-60 object-cover transition-all duration-700 ${
                        !isUnlocked
                          ? "blur-md scale-105"
                          : "hover:scale-110"
                      }`}
                    />

                  </div>

                  <div className="p-6">

                    <h2 className="text-3xl font-bold mb-4">
                      {capsule.title}
                    </h2>

                    <p className="text-zinc-400 mb-5 leading-relaxed">

                      {isUnlocked
                        ? capsule.message
                        : "This vault is locked 🔒"}

                    </p>

                    <div className="mb-5">

                      <p className="text-purple-400 font-semibold mb-2">

                        Unlock Date

                      </p>

                      <p className="text-zinc-300">

                        {new Date(
                          capsule.unlock_date
                        ).toLocaleString()}

                      </p>

                    </div>

                    {/* Countdown */}
                    {!isUnlocked && (

                      <div className="bg-black/40 p-4 rounded-2xl mb-5">

                        <p className="text-zinc-400 mb-2">
                          Unlocks In
                        </p>

                        <Countdown
                          date={new Date(capsule.unlock_date)}
                          className="text-2xl font-bold text-pink-400"
                        />

                      </div>

                    )}

                    {/* Open Button */}
                    {isUnlocked && (

                      <button
                        onClick={triggerConfetti}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
                      >
                        Open Vault 🎉
                      </button>

                    )}

                    {/* Status */}
                    <div
                      className={`mt-5 text-lg font-bold ${
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

                </motion.div>
              );
            })}

          </div>

        )}

      </div>
    </>
  );
}

export default Dashboard;