import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      //1. User Registration
      const result = await loginWithGoogle();
      console.log(result);

      //2. save user data in database

      //3. get token

      toast.success("SignUp Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };

  return (
    <div onClick={handleGoogleSignIn} className="btn btn-outline btn-info hover:bg-[#5a9fdb] p-2 flex items-center gap-4 justify-center cursor-pointer rounded-md">
      <FcGoogle className="text-4xl" />
      <span className="text-black hover:text-white text-xl font-semibold">
        Continue With Google
      </span>
    </div>
  );
};

export default SocialLogin;
