import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import { imageUpload } from "../../api/Utils/Utils";

const CustomAssetUpdate = ({ asset, setIsOpen, isOpen }) => {
  const { additional, assetInfo, assetType, name, price, _id } = asset;
  console.log("asset update ", asset);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const image = data.image[0];
    console.log(image);

    const imageData = await imageUpload(image);

    // create user entry in the database
    const assetInfo = {
      name: data.assetName,
      price: data.price,
      assetType: data.assetType,
      image: imageData?.data?.display_url,
      assetInfo: data.assetInfo,
      additional: data.additionalInfo,
    };
    console.log(assetInfo);

    const assetUpdate = await axiosSecure
      .patch(`/asset-update/${_id}`, assetInfo)
      .then((res) => {
        console.log(res.data);
        navigate("/")
        toast.success("update successfully");
      });
    console.log(assetUpdate);
  };

  return (
    <div>
      <div className="w-full bg-cover bg-center">
        <div className="">
          <div className=" flex flex-row  rounded-xl justify-between">
            <div className=" w-full  flex-shrink-0 shadow-2xl ">
              <h2 className="text-center text-3xl font-bold mt-12">
                Make a Custom Request
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full p-24 pt-12"
              >
                <div className="grid grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      defaultValue={name}
                      type="text"
                      {...register("assetName", { required: true })}
                      placeholder="Asset Name"
                      className="input input-bordered"
                    />
                    {errors.name && (
                      <span className="text-[#D1A054]">
                        Asset Name is required
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      defaultValue={price}
                      type="text"
                      {...register("price", { required: true })}
                      placeholder="$ Price"
                      className="input input-bordered"
                    />
                    {errors.email && (
                      <span className="text-[#D1A054]">Price is required</span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label"></label>

                    <select
                      value={assetType}
                      className="border py-3 rounded-md"
                      {...register("assetType", { required: true })}
                    >
                      <option disabled selected required>
                        Asset Type
                      </option>
                      <option value="laptop">laptop</option>
                      <option value="keyboard">keyboard</option>
                      <option value="chair">chair</option>
                      <option value="desk">desk</option>
                      <option value="phone">phone</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="image" className="block mb-2 text-sm">
                      Select Asset Image:
                    </label>
                    <input
                      {...register("image", { required: true })}
                      required
                      type="file"
                      id="image"
                      accept="image/*"
                      className="border w-full rounded-lg"
                    />
                    {errors.image && (
                      <span className="text-[#D1A054]">
                        Asset Image is required
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      defaultValue={assetInfo}
                      type="text"
                      {...register("assetInfo", { required: true })}
                      placeholder="Why You Need This"
                      className="input input-bordered"
                    />
                    {errors.email && (
                      <span className="text-[#D1A054]">Price is required</span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      defaultValue={additional}
                      type="text"
                      {...register("additionalInfo", { required: true })}
                      placeholder="Additional Information"
                      className="input input-bordered"
                    />
                    {errors.email && (
                      <span className="text-[#D1A054]">
                        Additional Information
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-control mt-12 w-fit mx-auto block">
                  <button
                    type="submit"
                    className="btn mr-12  bg-[#D1A054B3] hover:bg-[#d19f54fb] text-white "
                  >
                    Save
                  </button>
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn  bg-[#D1A054B3] hover:bg-[#d19f54fb] text-white "
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAssetUpdate;
CustomAssetUpdate.propTypes = {
  asset: PropTypes.node,
  isOpen: PropTypes.node,
  setIsOpen: PropTypes.node,
};
