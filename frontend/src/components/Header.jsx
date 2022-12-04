import { useContext } from "react";
import { GiTicket } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

function Header() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const logoClickHandler = () => {
    navigate("/");
  };
  return (
    <header className="header secondary-app-color p-6 flex justify-between items-center sticky top-0 z-50">
      <div
        className="flex items-center gap-2 color-primary-light-app left-header"
        onClick={logoClickHandler}
      >
        <GiTicket className="text-xl" />
        <h1 className="text-2xl">Ticketing System</h1>
      </div>
      <div className="flex gap-5">
        {ctx.isLoggedIn ? (
          <>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
