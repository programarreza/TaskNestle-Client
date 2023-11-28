import { axiosSecure } from "../Hooks/useAxiosSecure";

// get the user role
export const getUserRole = async (email) => {
  const { data } = await axiosSecure(`/users/${email}`);
  return data.role;
};

// get custom request asset
export const getCustomAsset = async (email) => {
  const { data } = await axiosSecure(`/custom-assets/${email}`);
  return data;
};

// get custom request asset
export const getAsset = async (email) => {
  const { data } = await axiosSecure(`/assets/${email}`);
  return data;
};


