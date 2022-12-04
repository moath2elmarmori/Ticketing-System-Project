import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth-context";
import { GET_PRODUCTS_BY_USER_ID } from "../queries/productQueries";
import { toast } from "react-toastify";
import ProductRow from "../components/ProductRow";

function MyProducts() {
  const { userId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_USER_ID, {
    variables: { id: userId },
  });
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="py-6 px-4">
      <h1 className="text-2xl text-center font-bold mb-10">My Products</h1>
      {!loading && data.getProductsByUserId.length !== 0 ? (
        <>
          <div>
            <h1 className="text-xl font-bold mb-4">
              {data.getProductsByUserId.length} Products
            </h1>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {data.getProductsByUserId.map((product) => (
                  <ProductRow key={product._id} productData={product} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-bold text-2xl text-center">
            No Product Added By You, Yet!
          </h1>
        </>
      )}
    </div>
  );
}

export default MyProducts;
