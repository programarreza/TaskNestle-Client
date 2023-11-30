import { axiosSecure } from "../Hooks/useAxiosSecure";

// get the user role
export const getUserRole = async (email) => {
  const { data } = await axiosSecure(`/users/${email}`);
  return data;
};
// Get pending role user
export const getPendingRole = async (email) => {
  const { data } = await axiosSecure(`/pendingUser/${email}`);
  return data;
};

// get custom request asset
export const getCustomAsset = async (email) => {
  const { data } = await axiosSecure(`/custom-assets/${email}`);
  return data;
};

export const getAllAsset = async () => {
  const { data } = await axiosSecure('/assets');
  return data;
};

export const getTeamMember = async () => {
  const { data } = await axiosSecure('/all-users');
  return data;
};

// get custom request asset
export const getAsset = async (email) => {
  const { data } = await axiosSecure(`/assets/${email}`);
  return data;
};

// get my request asset
export const getMyAssets = async (email) => {
  const { data } = await axiosSecure(`/request-assets/${email}`);
  return data;
};



// get my request asset
export const getPendingAssets = async (email) => {
  const { data } = await axiosSecure(`/pending-assets/${email}`);
  return data;
};


