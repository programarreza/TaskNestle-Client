import { axiosSecure } from "../Hooks/useAxiosSecure";

// get the user role
export const getUserRole = async (email) => {
  const { data } = await axiosSecure(`/users/${email}`);
  return data;
};

export const getEmployee = async () => {
  const { data } = await axiosSecure(`/users`);
  return data;
};

// Get pending role user
export const getPendingRole = async (email) => {
  const { data } = await axiosSecure(`/pendingUser/${email}`);
  return data;
};


// pending product
// export const getPendingProducts = async (email) => {
//   const { data } = await axiosSecure(`/pending-products/${email}`);
//   return data;
// };

// get top request product 
export const getTopProducts = async () => {
  const { data } = await axiosSecure('/top-product');
  return data;
};

// get custom request asset
export const getCustomAsset = async (email) => {
  const { data } = await axiosSecure(`/custom-assets/${email}`);
  return data;
};

// get custom request asset
export const getTypeCount = async (email) => {
  const { data } = await axiosSecure(`/product-type-count/${email}`)
  return data;
};

// get limited stock
export const getLimitedStock = async (email) => {
  const { data } = await axiosSecure(`/limited-stock/${email}`);
  return data;
};


// get packages
export const getPackage = async () => {
  const { data } = await axiosSecure('/packages');
  return data;
};

// get single package
export const getSinglePackage = async (id) => {
  const { data } = await axiosSecure(`/singePackage/${id}`);
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




