import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { useContext } from "react";
import ProductRow from "../components/ProductRow";
import { getAllProductsByCompanyId } from "../queries/productQueries";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useState } from "react";

function Products() {
  const [skip, setSkip] = useState(8);
  const [products, setProducts] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const { companyId } = useContext(AuthContext);
  const { data, loading, error } = useQuery(getAllProductsByCompanyId, {
    variables: { id: companyId, limit: 8, skip: 0 },
  });
  const [fetchProducts] = useLazyQuery(getAllProductsByCompanyId);
  useEffect(() => {
    if (data) {
      setProducts(data.getAllProductsByCompanyId);
    }
  }, [data]);

  const nextFn = async () => {
    const data = await fetchProducts({
      variables: { id: companyId, limit: 8, skip },
    });
    setSkip((prevSkip) => prevSkip + 8);
    if (data.data.getAllProductsByCompanyId.length !== 0) {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...data.data.getAllProductsByCompanyId,
      ]);
    } else {
      setHasMoreProducts(false);
    }
  };

  if (error) {
    toast.error(error.message);
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <h1 className="text-2xl text-center py-6 mb-4">Products</h1>
        <div className="p-4">
          {!loading && products.length !== 0 ? (
            <>
              <h2 className="text-2xl mb-8">
                {products.length} Products Shown
              </h2>
              <InfiniteScroll
                dataLength={data.getAllProductsByCompanyId.length}
                next={nextFn}
                hasMore={hasMoreProducts}
                height={500}
              >
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <ProductRow key={product._id} productData={product} />
                    ))}
                  </tbody>
                </table>
              </InfiniteScroll>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center">
                No Products Added, Yet!
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
