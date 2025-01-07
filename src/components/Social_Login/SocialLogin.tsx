import { AuthContext } from "@/AuthProvider/Authprovider";
import { useContext } from "react";
import { toast } from "sonner";
import google from "../../assets/google.svg";

const SocialLogin = () => {

  const auth = useContext(AuthContext);
  if (!auth) throw new Error('Auth context is required');
  const { signIn_Google } = auth;



  // Handle Google login
  const handle_google_login = async () => {
    await signIn_Google()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <>   <div className="my-4 text-center text-gray-500">or sign in with</div>
      <div className="flex flex-col items-center gap-5 w-full">
        <button
          className="flex  items-center justify-center w-full max-w-xs p-3 text-black border border-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:text-rose-600 hover:border-rose-600 hover:scale-105"
          onClick={handle_google_login}
          title="Sign in with Google"
        >
          <img
            src={google}
            alt="Google Logo"
            className="w-5 h-5 mr-2"/>
          Sign in with Google
        </button>
      </div>
   
    </>
  );
};

export default SocialLogin;