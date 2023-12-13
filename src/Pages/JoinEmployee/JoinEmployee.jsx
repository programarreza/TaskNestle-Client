import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosLocal from "../../Hooks/useAxiosLocal";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { imageUpload } from "../../api/Utils/Utils";

const JoinEmployee = () => {
  const axiosLocal = useAxiosLocal();
  const { createUser, updateUserProfile } = useAuth();
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
            role: "user",
          };
          axiosLocal.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("Thank you for request");
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
        <title>TaskNestle | Join as Employee</title>
      </Helmet>

      <div className="w-full min-h-screen flex bg-cover bg-center">
        <div className="hero">
          <div className="hero-content flex flex-col md:flex-row  rounded-xl justify-between">
            <div className="text-center hidden md:flex lg:text-left w-1/2" data-aos="fade-right">
              <img
                className="w-full h-[60vh]"
                src="https://i.postimg.cc/XYQMRGrg/33728241-removebg-preview.png"
                alt=""
              />
            </div>
            <div className="card w-1/1  flex-shrink-0 shadow-2xl"  data-aos="fade-left">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-[350px]"
              >
                <h2 className="text-center text-3xl font-bold">
                  Join as Employee
                </h2>
                <div className="form-control">
                  <label className="label">
                    {/* <span className="label-text">Full Name</span> */}
                  </label>
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
                  <label className="label">
                    {/* <span className="label-text">Email</span> */}
                  </label>
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
                  <label className="label">
                    {/* <span className="label-text">Password</span> */}
                  </label>
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
                    Select Profile Image:
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

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn  bg-[#D1A054B3] hover:bg-[#d19f54fb] text-white "
                  >
                    Sign Up
                  </button>
                  {/* <p className="text-[#D1A054] text-center mt-2">
                    Already registered?{" "}
                    <Link to={"/login"}>
                      <span className="font-semibold">Go to log in</span>
                    </Link>
                  </p> */}
                  <div className="divider">or</div>
                </div>
                <div>
                  <SocialLogin />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinEmployee;
