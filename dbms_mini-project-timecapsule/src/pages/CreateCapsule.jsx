import { useState } from "react";

import { useNavigate } from "react-router-dom";

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

    <div className="min-h-screen bg-black flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-10 rounded-3xl w-[500px]"
      >

        <h1 className="text-4xl text-white font-bold mb-8">
          Create Vault
        </h1>

        {/* Title */}
        <input
          type="text"
          placeholder="Vault Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
        />

        {/* Message */}
        <textarea
          placeholder="Write your future message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white h-40"
        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
        />

        {/* Unlock Date */}
        <input
          type="datetime-local"
          value={unlockDate}
          onChange={(e) =>
            setUnlockDate(e.target.value)
          }
          className="w-full p-4 mb-6 rounded-xl bg-zinc-800 text-white"
        />

        <button
          className="w-full bg-purple-600 p-4 rounded-xl text-white font-bold"
        >
          Create Capsule
        </button>

      </form>

    </div>
  );
}

export default CreateCapsule;