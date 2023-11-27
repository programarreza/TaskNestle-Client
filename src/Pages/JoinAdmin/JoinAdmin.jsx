import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosLocal from "../../Hooks/useAxiosLocal";
import { imageUpload } from "../../Utils/Utils";

const JoinAdmin = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosLocal = useAxiosLocal();
  const navigate = useNavigate();

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

    // user registration with firebase
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      // profile update
      updateUserProfile(data.name, imageData?.data?.display_url)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            dob: data.dob,
            image: imageData?.data?.display_url,
            package: data.package,
            companyName: data.companyName,
            role: "admin",
          };
          axiosLocal.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("SignUp Successfully");
              reset();
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    });
  };

  return (
    <div>
      <Helmet>
        <title>TaskNestle | Join as Admin</title>
      </Helmet>

      <div className="w-full min-h-screen flex bg-cover bg-center">
        <div className="hero">
          <div className="hero-content flex flex-row  rounded-xl justify-between">
            <div className="text-center lg:text-left w-1/2">
              <img
                className="w-full h-[60vh]"
                src="https://i.postimg.cc/XYQMRGrg/33728241-removebg-preview.png"
                alt=""
              />
            </div>
            <div className="card w-1/1  flex-shrink-0 shadow-2xl ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-[350px]"
              >
                <h2 className="text-center text-3xl font-bold">
                  Join as Admin
                </h2>
                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Full Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-[#D1A054]">Name is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="text"
                    {...register("companyName", { required: true })}
                    placeholder="Company Name"
                    className="input input-bordered"
                  />
                  {errors.companyName && (
                    <span className="text-[#D1A054]">
                      Company Name is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-[#D1A054]">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      // TODO: uncomment this validation
                      // pattern:
                      //   /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                    })}
                    placeholder="Password"
                    className="input input-bordered"
                  />

                  {errors.password?.type === "required" && (
                    <p className="text-[#D1A054]">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-[#D1A054]">
                      Password must be 6 Character
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-[#D1A054]">
                      Password must be less den 20 Character
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-[#D1A054]">
                      Password must have one upper case one lower carse, one
                      number and one special character
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date Of birth</span>
                  </label>
                  <input
                    className="py-3 rounded-lg px-1 border"
                    type="date"
                    {...register("dob", { required: true })}
                  />
                  {errors.dob && (
                    <span className="text-[#D1A054]">
                      Date Of birth is required
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Company Logo:
                  </label>
                  <input
                    {...register("image", { required: true })}
                    required
                    type="file"
                    id="image"
                    accept="image/*"
                  />
                  {errors.image && (
                    <span className="text-[#D1A054]">
                      Date Of birth is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>

                  <select
                    className="border py-3 rounded-md"
                    {...register("package", { required: true })}
                  >
                    <option disabled selected required>
                      Package Details
                    </option>
                    <option value="1">5 Members for $5</option>
                    <option value="2">10 Members for $8</option>
                    <option value="3">20 Members for $15</option>
                  </select>
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn  bg-[#D1A054B3] hover:bg-[#d19f54fb] text-white "
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAdmin;
