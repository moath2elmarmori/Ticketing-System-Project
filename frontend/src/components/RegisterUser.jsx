import { useRef } from "react";
import { getAllCompanies } from "../queries/authQueries";
import { registerUser } from "../mutations/authMutations";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import BackButton from "./BackButton";
import mutationHandler from "../utils/mutationHandler";

function RegisterUser() {
  const { loading, data } = useQuery(getAllCompanies);
  const [addUser] = useMutation(registerUser);

  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const extensionRef = useRef();
  const companyNameRef = useRef();
  const companyPasscodeRef = useRef();
  const roleRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      extension: +extensionRef.current.value,
      companyName: companyNameRef.current.value,
      companyPasscode: companyPasscodeRef.current.value,
      role: roleRef.current.value,
    };
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.extension ||
      !userData.companyName ||
      !userData.companyPasscode ||
      !userData.role
    ) {
      return toast.error("Please Add All Fields");
    }
    if (userData.extension.toString().length !== 4) {
      return toast.error("Extension Must Be Exactly 4 Digits");
    }
    const responseData = await mutationHandler(
      addUser,
      userData,
      "Registered successfully"
    );
    if (responseData) {
      const userDataForLocalStorage = responseData.data.registerUser;
      // make the user logged in always but if he refreshes the tab or starts a new tab after 2 hours from logging in clear the local storage, (all this login in the auth-context)
      const localStorageExpiresIn = new Date().setHours(
        new Date().getHours() + 2
      );
      userDataForLocalStorage.expiresIn = localStorageExpiresIn;
      localStorage.setItem("user", JSON.stringify(userDataForLocalStorage));
      ctx.setIsLoggedIn(true);
      ctx.setUserId(userDataForLocalStorage._id);
      ctx.setCompanyId(userDataForLocalStorage.companyId);
      ctx.setUserRole(userDataForLocalStorage.role);
      ctx.setRegisterAs("");
      navigate("/");
    }
  };

  return (
    <div className=" py-4 px-10">
      <h1 className="text-2xl mb-6">Register As A User</h1>
      <div>
        <BackButton />
        <form onSubmit={formSubmitHandler}>
          <div className="form-divs-container grid grid-cols-2 gap-x-5 gap-y-2">
            <div className="input-label-div mb-3">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                ref={usernameRef}
              />
            </div>
            <div className="input-label-div mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                ref={emailRef}
              />
            </div>
            <div className="input-label-div mb-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div className="input-label-div mb-3">
              <label htmlFor="extension">
                Extension: <span className="text-slate-400"> (4 digits)</span>
              </label>
              <input
                type="number"
                name="extension"
                id="extension"
                placeholder="Extension (Must Be 4 Digits)"
                maxLength={4}
                ref={extensionRef}
              />
            </div>
            <div className="input-label-div mb-3">
              <label htmlFor="working-company">Company:</label>
              <select
                name="company-name"
                id="company-name"
                ref={companyNameRef}
              >
                <option value="">--Please Select--</option>
                {!loading && data ? (
                  <>
                    {data.getAllCompanies.map((company) => (
                      <option key={company.name} value={company.name}>
                        {company.name}
                      </option>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </select>
            </div>
            <div className="input-label-div mb-3">
              <label htmlFor="role">Role:</label>
              <select name="role" id="role" ref={roleRef}>
                <option value="">--Please Select--</option>
                <option value="agent">Agent</option>
                <option value="backOffice">Back Office</option>
                <option value="networkDepartment">Network Department</option>
              </select>
            </div>
            <div className="input-label-div mb-3">
              <label htmlFor="company-passcode">Company Passcode:</label>
              <input
                type="password"
                name="company-passcode"
                id="company-passcode"
                placeholder="Company Passcode"
                ref={companyPasscodeRef}
              />
            </div>
          </div>
          <button
            className="bg-sky-600 px-4 py-2 my-6 rounded-lg text-white"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
