import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import ParticlesBackground from "../components/ParticlesBackground";

function CreateCapsule() {

  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");

  const [unlockDate, setUnlockDate] = useState("");

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("user_id", user.id);

      formData.append("title", title);

      formData.append("message", message);

      formData.append(
        "unlock_date",
        unlockDate
      );

      formData.append("image", image);

      const response = await fetch(
        "http://localhost:5000/create-capsule",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      alert(data.message);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Server Error");
    }
  };

  return (

    <>
      <Navbar />

      <ParticlesBackground />

      <div className="min-h-screen bg-black flex justify-center items-center px-6 py-12 relative">

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-10 rounded-3xl w-full max-w-2xl relative z-10"
        >

          <h1 className="text-5xl text-white font-bold mb-3">
            Create Vault
          </h1>

          <p className="text-zinc-400 mb-8">
            Store memories for your future self ✨
          </p>

          <input
            type="text"
            placeholder="Vault Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
          />

          <textarea
            placeholder="Write your future message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white h-40"
          />

          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
          />

          <input
            type="datetime-local"
            value={unlockDate}
            onChange={(e) =>
              setUnlockDate(e.target.value)
            }
            className="w-full p-4 mb-6 rounded-xl bg-zinc-800 text-white"
          />

          <button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl text-white font-bold"
          >
            Create Capsule
          </button>

        </form>

      </div>
    </>
  );
}

export default CreateCapsule;