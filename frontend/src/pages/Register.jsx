import { useEffect } from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import RegisterUser from "../components/RegisterUser";
import RegisterCompany from "../components/RegisterCompany";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    isLoggedIn,
    registerAs,
    setRegisterAs,
    renderRegisterForm,
    setRenderRegisterForm,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!registerAs) {
      toast.error("Please Choose Your Registeration Status");
    } else {
      setRenderRegisterForm(true);
      // setRegisterAs("");
    }
  };

  useEffect(() => {
    document.body.classList.add("hide-overflow");
    // check if the user is logged in
    if (isLoggedIn) {
      toast.error("You are logged in already");
      return navigate("/");
    }
    return () => {
      document.body.classList.remove("hide-overflow");
    };
  }, [isLoggedIn, navigate]);

  return (
    <section className="min-height-without-heading md:flex  md:relative register-page-div md:align-start md:my-0 my-20 align-center">
      <div className="md:left-section md:py-10 md:px-6 md:bg-sky-700 md:basis-5/12 md:text-white md:block hidden ">
        <h1 className="text-2xl font-bold ">Register</h1>
        <p className="my-20 md:text-3xl">
          A Few Clicks Away From Experiencing The Ticketing System
        </p>
        <div className="icon-div text-8xl text-white">
          <SiGnuprivacyguard />
        </div>
      </div>
      <div className="right-section  py-8 px-6 basis-7/12">
        <motion.div
          animate={
            renderRegisterForm
              ? {
                  y: "100%",
                  opacity: 0,
                  transitionEnd: { display: "none" },
                }
              : {
                  y: "0%",
                  opacity: 1,
                  display: "block",
                }
          }
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl">Choose How To Register</h1>
          <div className=" p-10 mt-5 shadow-2xl">
            <form onSubmit={formSubmitHandler}>
              <h4 className="mb-4">Register As :</h4>
              <div className="mb-6">
                <input
                  type="radio"
                  name="register-as"
                  id="company"
                  value={"company"}
                  onClick={() => setRegisterAs("company")}
                />
                <label
                  htmlFor="company"
                  className="ml-2"
                  onClick={() => setRegisterAs("company")}
                >
                  A Company
                </label>
              </div>
              <div className="mb-6">
                <input
                  type="radio"
                  name="register-as"
                  id="user"
                  value={"user"}
                  onClick={() => setRegisterAs("user")}
                />
                <label
                  htmlFor="user"
                  className="ml-2"
                  onClick={() => setRegisterAs("user")}
                >
                  A User For A Company
                </label>
              </div>
              <button
                type="submit"
                className="bg-sky-700 text-white py-2 px-4 rounded-lg"
              >
                Continue
              </button>
            </form>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: "100%", opacity: 0, y: "-10rem" }}
          animate={renderRegisterForm ? { opacity: 1, x: 0, y: 0 } : ""}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {registerAs === "user" && renderRegisterForm && <RegisterUser />}
          {registerAs === "company" && renderRegisterForm && (
            <RegisterCompany />
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Register;
