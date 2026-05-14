import axios from "axios";

const uploadImage = async (file) => {
  const data = new FormData();

  data.append("file", file);

  data.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const cloudName =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data
  );

  return res.data.secure_url;
};

export default uploadImage;