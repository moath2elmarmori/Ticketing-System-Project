import { useRef, useContext } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { registerCompany } from "../mutations/authMutations";

import { getAllCompanies } from "../queries/authQueries";
import AuthContext from "../context/auth-context";
import mutationHandler from "../utils/mutationHandler";

function RegisterCompany() {
  const [addCompany] = useMutation(registerCompany, {
    refetchQueries: [{ query: getAllCompanies }],
  });
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  const nameRef = useRef();
  const passcodeRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const companyData = {
      name: nameRef.current.value,
      passcode: passcodeRef.current.value,
    };
    if (!companyData.name || !companyData.passcode) {
      return toast.error("Please Add All Fields");
    }
    const responseData = await mutationHandler(
      addCompany,
      companyData,
      "Registered company successfully, Please add your first user for the company"
    );
    if (responseData) {
      // after registering new company, i will redirect the person to registering new user for the company
      // i will do that by mutating the state inside of the context that is responsible of registering
      ctx.setRegisterAs("user");
      navigate("/register");
    }
  };

  return (
    <div className="shadow-2xl px-10">
      <h1 className="text-2xl mb-6">Register New Company</h1>
      <div>
        <BackButton />
        <form onSubmit={formSubmitHandler}>
          <div className="form-divs-container grid grid-cols-2 gap-x-5 gap-y-2">
            <div className="input-label-div mb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Company Name"
                ref={nameRef}
              />
            </div>
            <div className="input-label-div mb-3">
              <label htmlFor="passcode">Passcode:</label>
              <input
                type="password"
                name="passcode"
                id="passcode"
                placeholder="Passcode For Company"
                ref={passcodeRef}
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

export default RegisterCompany;
