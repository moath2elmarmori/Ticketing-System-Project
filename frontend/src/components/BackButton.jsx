import { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import AuthContext from "../context/auth-context";

function BackButton() {
  const ctx = useContext(AuthContext);
  const backButtonHandler = () => {
    ctx.setRenderRegisterForm(false);
  };
  return (
    <button
      className="flex items-center p-2 absolute right-4 top-0 gap-1 rounded-md bg-slate-200 hover:bg-slate-400 duration-300"
      onClick={backButtonHandler}
    >
      <BiArrowBack />
      Back
    </button>
  );
}

export default BackButton;
