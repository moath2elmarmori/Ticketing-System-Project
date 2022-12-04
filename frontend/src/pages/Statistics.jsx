import { useQuery } from "@apollo/client";
import React from "react";
import { useContext } from "react";
import { getUserById } from "../queries/userQueries";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Statistics() {
  const { userId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(getUserById, {
    variables: { id: userId },
  });

  const navigate = useNavigate();

  const myProductsRowClickHandler = () => {
    navigate("/my-products");
  };

  const myTicketsRowClickHandler = () => {
    navigate("/my-tickets");
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {!loading && data && (
        <div>
          <h1 className="text-2xl text-center py-6 mb-4">
            {data.getUserById.username}'s statistics
          </h1>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">
              Extension: <span>{data.getUserById.extension}</span>
            </h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={myProductsRowClickHandler}>
                  <td>Products Added</td>
                  <td>{data.getUserById.products.length}</td>
                </tr>
                <tr onClick={myTicketsRowClickHandler}>
                  <td>Tickets Made</td>
                  <td>{data.getUserById.tickets.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Statistics;
