import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRef } from "react";
import { GET_PRODUCTS_BY_PRODUCT_NAME } from "../queries/productQueries";
import Spinner from "./Spinner";
import ProductRow from "./ProductRow";
import { toast } from "react-toastify";

function SearchTicketCard() {
  const productNameRef = useRef();
  const [searchProduct, { loading, data, error }] = useLazyQuery(
    GET_PRODUCTS_BY_PRODUCT_NAME
  );
  const searchHandler = async (e) => {
    e.preventDefault();
    const searchObj = {
      name: productNameRef.current.value,
    };
    try {
      const data = await searchProduct({ variables: searchObj });
      console.log("daata");
      console.log(data);
    } catch (error) {
      console.log("the error");
      console.log(error);
    }
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
      <div className="ticket-card rounded-xl mb-6">
        <h4 className="text-xl p-4 bg-cyan-700 text-white rounded-t-xl">
          Search Product For Tickets
        </h4>
        <form className="px-16">
          <div className="p-4 text-left">
            <label htmlFor="search-product" className="block font-bold">
              Product Name:
            </label>
            <input
              type="text"
              id="search-product"
              placeholder="Enter Product Name"
              className="bg-slate-100 shadow-xl w-full p-2"
              ref={productNameRef}
            />
          </div>

          <div className="p-4">
            <button
              type="submit"
              className="py-2 px-3 font-medium rounded-md bg-cyan-700 w-full text-white"
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {!loading && data && (
        <div className="my-6 px-4">
          {data.getProductsByProductName.length !== 0 ? (
            <>
              <h1 className="text-xl font-bold">Products Found</h1>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getProductsByProductName.map((product) => (
                    <ProductRow key={product._id} productData={product} />
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold text-center">
                No Product Found
              </h1>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SearchTicketCard;
