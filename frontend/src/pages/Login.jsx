import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { loginUser } from "../mutations/authMutations";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { toast } from "react-toastify";

function Login() {
  const ctx = useContext(AuthContext);
  const [logUserIn] = useMutation(loginUser);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const responseData = await logUserIn({ variables: loginData });
      toast.success("Logged in successfully");
      const userData = responseData.data.loginUser;
      // make the user logged in always but if he refreshes the tab or starts a new tab after 2 hours from logging in clear the local storage, (all this login in the auth-context)
      const localStorageExpiresIn = new Date().setHours(
        new Date().getHours() + 2
      );
      userData.expiresIn = localStorageExpiresIn;
      localStorage.setItem("user", JSON.stringify(userData));
      ctx.setIsLoggedIn(true);
      ctx.setUserId(userData._id);
      ctx.setCompanyId(userData.companyId);
      ctx.setUserRole(userData.role);
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };
  return (
    <div className="min-height-without-heading flex justify-center items-center">
      <div className=" p-10 text-center rounded-xl shadow-2xl">
        <h1 className="font-bold text-2xl mb-10 mt-2 color-primary-light-app">
          User Login
        </h1>
        <h4 className="text-lg mb-8 text-stone-700">
          Provide Your Credentials To Start Using Your Account
        </h4>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              className="block w-full p-2 rounded-md mb-6 outline-none border-2 border-slate-400"
              ref={emailRef}
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              className="block w-full p-2 rounded-md outline-none border-2 border-slate-400"
              ref={passwordRef}
              placeholder="Password"
            />
          </div>
          <button className="px-4 py-2 my-6 rounded-lg background-color-primary-light-app text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
