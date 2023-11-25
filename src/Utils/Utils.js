import axios from "axios";
import { axiosSecure } from "../Hooks/useAxiosSecure";


export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data;
};

// save user data in database
export const saveUser = async (user) => {
  const currentUser = {
    email: user?.email,
    role: "employee",
    status: "Verified",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};
