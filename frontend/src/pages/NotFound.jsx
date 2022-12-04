import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-height-without-heading flex flex-col justify-center items-center">
      <FaExclamationTriangle size="5em" />
      <h1 className="text-4xl font-bold my-4">404</h1>
      <p className="text-xl mb-4">Sorry, this page does not exist</p>
      <Link
        to="/"
        className="px-4 py-2 rounded-md text-white bg-black hover:bg-neutral-700 duration-300"
      >
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;
