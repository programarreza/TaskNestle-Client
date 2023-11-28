import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AddAsset = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    const assetInfo = {
      name: data.productName,
      type: data.productType,
      quantity: data.productQuantity,
      email: user?.email,
    };
    console.log(assetInfo);
    axiosSecure
      .post("/add-product", assetInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Product Added Successfully");
          console.log(res.data);
            reset();
          //   navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Add An Asset</title>
      </Helmet>

      <div className="w-full min-h-screen flex bg-cover bg-center">
        <div className="hero">
          <div className="hero-content flex flex-row  rounded-xl justify-between ">
            <div className="text-center lg:text-left w-1/2">
              <img
                className="w-full "
                src="https://i.postimg.cc/zDSrLmTC/Data-Infographic-600x600-1.webp"
                alt=""
              />
            </div>

            <div className="card w-1/1  flex-shrink-0 shadow-2xl ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-[350px]"
              >
                <h2 className="text-center text-3xl font-bold">Add An Asset</h2>
                <div className="form-control">
                  <label className="label">
                    {/* <span className="label-text">Full Name</span> */}
                  </label>
                  <input
                    type="text"
                    {...register("productName", { required: true })}
                    placeholder="Product Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-[#D1A054]">
                      Product Name is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label"></label>

                  <select
                    className="border py-3 rounded-md"
                    {...register("productType", { required: true })}
                  >
                    <option disabled selected required>
                      Product Type
                    </option>
                    <option value="laptop">laptop</option>
                    <option value="keyboard">keyboard</option>
                    <option value="chair">chair</option>
                    <option value="desk">desk</option>
                    <option value="phone">phone</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label"></label>

                  <select
                    className="border py-3 rounded-md"
                    {...register("productQuantity", { required: true })}
                    required
                  >
                    <option disabled selected required>
                      Product Quantity
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">4</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn  bg-[#D1A054B3] hover:bg-[#d19f54fb] text-white "
                  >
                    Add Now
                  </button>
                </div>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
