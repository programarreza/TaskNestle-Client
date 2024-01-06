import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosLocal from "../../../Hooks/useAxiosLocal";
import { imageUpload } from "../../../api/Utils/Utils";
import Container from "../../../components/shared/Container/Container";

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
          reset();
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
          <title>Make a Custom Request </title>
        </Helmet>

        <div className="w-full bg-cover bg-center" data-aos="zoom-in">
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
                  <div className="grid lg:grid-cols-2 gap-5">
                    <div className="form-control">
                      <label className="label"></label>
                      <input
                        type="text"
                        {...register("assetName", { required: true })}
                        placeholder="Asset Name"
                        className="input border-0.5 border-gray-500 focus:outline-[#d19f54fb] "
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
                        className="input border-0.5 border-gray-500 focus:outline-[#d19f54fb] "
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
                        className="border py-3 input border-0.5 border-gray-500 focus:outline-[#d19f54fb] "
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
                      <label htmlFor="image" className="block mb-2 text-sm"></label>
                      <input
                        {...register("image", { required: true })}
                        required
                        type="file"
                        id="image"
                        accept="image/*"
                        placeholder="dfd"
                        className="input border-0.5 border-gray-500 focus:outline-[#d19f54fb]  w-full rounded-lg py-2 mt-2"
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
                        className="input border-0.5 border-gray-500 focus:outline-[#d19f54fb] "
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
                        className="input border-0.5 border-gray-500 focus:outline-[#d19f54fb] "
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
                      className="btn opacity-80 hover:opacity-100 bg-white bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
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
