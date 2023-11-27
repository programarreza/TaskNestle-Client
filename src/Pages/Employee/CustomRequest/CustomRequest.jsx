import { Helmet } from "react-helmet";
import useAxiosLocal from "../../../Hooks/useAxiosLocal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Container from "../../../components/shared/Container/Container";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../api/Utils/Utils";

const CustomRequest = () => {
  const axiosLocal = useAxiosLocal();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    reset,
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
      email: user?.email,
      price: data.price,
      assetType: data.assetType,
      image: imageData?.data?.display_url,
      assetInfo: data.assetInfo,
      additional: data.additionalInfo,
      date: new Date(),
      status: "pending",
    };
    console.log(assetInfo);
    axiosLocal
      .post("/asset-request", assetInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Request Successfully");
          // reset();
          // navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <>
        <Helmet>
          <title>TaskNestle | Make a Custom Request </title>
        </Helmet>

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
                        type="text"
                        {...register("price", { required: true })}
                        placeholder="$ Price"
                        className="input input-bordered"
                      />
                      {errors.email && (
                        <span className="text-[#D1A054]">
                          Price is required
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label"></label>

                      <select
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
                        type="text"
                        {...register("assetInfo", { required: true })}
                        placeholder="Why You Need This"
                        className="input input-bordered"
                      />
                      {errors.email && (
                        <span className="text-[#D1A054]">
                          Price is required
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label"></label>
                      <input
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

                  <div className="form-control mt-12 w-fit mx-auto">
                    <button
                      type="submit"
                      className="btn  bg-[#D1A054B3] hover:bg-[#d19f54fb] text-white "
                    >
                      Request Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </Container>
  );
};

export default CustomRequest;
