import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/auth-context";

function Logout() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      localStorage.clear();
      ctx.setIsLoggedIn(false);
      ctx.setRenderRegisterForm(false);
      ctx.setRegisterAs("");
      toast.success("Logged Out Successfully");
    }
    navigate("/login");
  }, [navigate, ctx]);

  return <div>Logout</div>;
}

export default Logout;
