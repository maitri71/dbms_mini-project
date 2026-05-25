import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { FaLock, FaClock, FaShieldAlt } from "react-icons/fa";

import Navbar from "../components/Navbar";

function Home() {

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white overflow-hidden relative">

        {/* Background Glow */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />

        <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >

            <div className="flex justify-center mb-8">

              <div className="w-28 h-28 rounded-full bg-zinc-900 border border-purple-500 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)]">

                <FaLock className="text-5xl text-purple-400" />

              </div>

            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8">

              Preserve Your{" "}

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">

                Memories

              </span>

              <br />

              For The Future

            </h1>

            <p className="text-zinc-400 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">

              Create secure digital time capsules that unlock at your chosen future date.
              Store messages, memories, and moments for your future self.

            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">

              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
              >
                Create Vault
              </Link>

              <Link
                to="/login"
                className="bg-zinc-900 border border-zinc-700 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-800 transition"
              >
                Login
              </Link>

            </div>

          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-28 max-w-6xl w-full">

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-5">

                <FaClock className="text-purple-400 text-2xl" />

              </div>

              <h3 className="text-2xl font-bold mb-3">
                Time Locked
              </h3>

              <p className="text-zinc-400">
                Capsules remain hidden and blurred until the unlock date arrives.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5">

                <FaShieldAlt className="text-blue-400 text-2xl" />

              </div>

              <h3 className="text-2xl font-bold mb-3">
                Secure Storage
              </h3>

              <p className="text-zinc-400">
                Your memories are stored securely inside a relational SQL database.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-5">

                <FaLock className="text-pink-400 text-2xl" />

              </div>

              <h3 className="text-2xl font-bold mb-3">
                Beautiful Reveal
              </h3>

              <p className="text-zinc-400">
                Unlock your memories with a futuristic dashboard experience.
              </p>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default Home;