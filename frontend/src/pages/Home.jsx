import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUsers } from "react-icons/fi";
import { TiTicket } from "react-icons/ti";
import { FaProductHunt } from "react-icons/fa";
import AuthContext from "../context/auth-context";
import { useQuery, useApolloClient } from "@apollo/client";
import { getComapnyById } from "../queries/companyQueries";
import Spinner from "../components/Spinner";
import { getAllProductsByCompanyId } from "../queries/productQueries";
import { GET_ALL_TICKETS_BY_COMPANY_ID } from "../queries/ticketQueries";

function Home() {
  const { isLoggedIn, setRegisterAs, companyId } = useContext(AuthContext);
  const navigate = useNavigate();

  const { loading, data, error } = useQuery(getComapnyById, {
    variables: { id: companyId },
  });

  // make a request the first time visiting the page to load all the tickets of the company to save them in the caceh
  const { loading: ticketsLoading } = useQuery(GET_ALL_TICKETS_BY_COMPANY_ID, {
    variables: { id: companyId },
  });

  if (ticketsLoading) {
  }

  // initialize the apollo client
  const apolloClient = useApolloClient();

  // read the cached data from getAllProductsByCompanyId and save to a constant
  const productCachedData = apolloClient.readQuery({
    query: getAllProductsByCompanyId,
    variables: { id: companyId },
  });
  let compnayTotalProducts;
  // if there is the a cached data update the compnayTotalProducts
  if (productCachedData) {
    compnayTotalProducts = productCachedData.getAllProductsByCompanyId.length;
  }

  const ticketsCachedData = apolloClient.readQuery({
    query: GET_ALL_TICKETS_BY_COMPANY_ID,
    variables: { id: companyId },
  });
  let companyTotalTickets;
  if (ticketsCachedData) {
    companyTotalTickets = ticketsCachedData.getAllTicketsByCompanyId.length;
  }

  let companyData;
  if (data) {
    companyData = data.getCompanyById;
  }

  useEffect(() => {
    if (isLoggedIn) {
      setRegisterAs("");
      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("You Have To Be Logged In First");
      return navigate("/login");
    }
  }, [navigate, isLoggedIn, setRegisterAs, error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {!loading && data && (
        <div className="home">
          <h1 className="text-2xl text-center py-6 ">{companyData.name}</h1>
          <h2 className="text-lg text-center mb-6 text-zinc-700">
            Here are the stats of the company
          </h2>
          <div className="home-grid px-4">
            <div className="grid-item">
              <div className="icon-div">
                <FiUsers />
              </div>
              <div>
                <p>{companyData.users.length} Users</p>
              </div>
              <Link
                to={"/users"}
                className="px-2 py-1 rounded-md bg-emerald-700 text-white"
              >
                View All Users
              </Link>
            </div>
            <div className="grid-item">
              <div className="icon-div">
                <FaProductHunt />
              </div>
              <div>
                <p>
                  {compnayTotalProducts
                    ? compnayTotalProducts
                    : companyData.products.length}{" "}
                  Products
                </p>
              </div>
              <Link
                to="/products"
                className="px-2 py-1 rounded-md bg-emerald-700 text-white"
              >
                View All Products
              </Link>
            </div>
            <div className="grid-item">
              <div className="icon-div">
                <TiTicket />
              </div>
              <div>
                <p>
                  {companyTotalTickets
                    ? companyTotalTickets
                    : companyData.tickets.length}{" "}
                  Tickets
                </p>
              </div>
              <Link
                to={"/tickets"}
                className="px-2 py-1 rounded-md bg-emerald-700 text-white"
              >
                View All Tickets
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
