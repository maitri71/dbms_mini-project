import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function CreateCapsule() {

  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");

  const [unlockDate, setUnlockDate] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/create-capsule",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            user_id: user.id,

            title,

            message,

            image_url: imageUrl,

            unlock_date: unlockDate,
          }),
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

      <div className="min-h-screen bg-black flex justify-center items-center px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-2xl"
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
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
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
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl text-white font-bold hover:scale-[1.02] transition"
          >
            Create Capsule
          </button>

        </form>

      </div>
    </>
  );
}

export default CreateCapsule;