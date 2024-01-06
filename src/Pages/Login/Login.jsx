import { Helmet } from "react-helmet";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    
    signIn(data.email, data.password)
    .then((result) => {
      toast.success("Login Successfully")
      navigate("/")
      console.log(result.user);
    })
    .catch(err => {
      toast.error(err.message)
    });
  };

  return (
    <div>
      <Helmet>
        <title>TaskNestle | Join as Employee</title>
      </Helmet>

      <div className="w-full min-h-screen flex  bg-cover bg-center">
        <div className="hero">
          <div className="hero-content flex flex-row  rounded-xl justify-between">
            <div className="text-center hidden md:flex lg:text-left w-1/2" data-aos="fade-right">
              <img
                className="w-full h-[60vh]"
                src="https://i.postimg.cc/XYQMRGrg/33728241-removebg-preview.png"
                alt=""
              />
            </div>
            <div className="card w-1/1  flex-shrink-0 shadow-2xl " data-aos="fade-left">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-[350px]"
              >
                <h2 className="text-center text-3xl font-bold">Login</h2>

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
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>

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

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn opacity-80 hover:opacity-100 bg-white bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                  >
                    Sign In
                  </button>

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

export default Login;
