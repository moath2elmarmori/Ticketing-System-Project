import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../mutations/productMutations";
import Spinner from "../components/Spinner";
import { getAllProductsByCompanyId } from "../queries/productQueries";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { toast } from "react-toastify";
import { getUserById } from "../queries/userQueries";

function AddProduct() {
  const { companyId, userId } = useContext(AuthContext);
  const [addNewProduct, { loading }] = useMutation(addProduct, {
    context: {
      headers: {
        authorization: localStorage.getItem("user")
          ? `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          : "",
      },
    },
    update: (cache, { data: { addProduct } }) => {
      const productsPageCachedData = cache.readQuery({
        query: getAllProductsByCompanyId,
        variables: { id: companyId },
      });
      // make sure that there is a cached data,,, (maybe there's not cachedData because the user hasn't visited the products page yet)
      if (productsPageCachedData) {
        const newData = [
          ...productsPageCachedData.getAllProductsByCompanyId,
          addProduct,
        ];
        cache.writeQuery({
          query: getAllProductsByCompanyId,
          variables: { id: companyId },
          data: { getAllProductsByCompanyId: newData },
        });
      }
      const statisticsPageData = cache.readQuery({
        query: getUserById,
        variables: { id: userId },
      });
      if (statisticsPageData) {
        const clonedData = { ...statisticsPageData.getUserById };
        const newProducts = [...clonedData.products, addProduct];
        clonedData.products = newProducts;
        cache.writeQuery({
          query: getUserById,
          variables: { id: userId },
          data: { getUserById: clonedData },
        });
      }
    },
  });
  const nameRef = useRef();
  const categoryRef = useRef();

  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const productData = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
    };
    try {
      const { data } = await addNewProduct({
        variables: productData,
      });
      navigate(`/products/${data.addProduct._id}`);
      toast.success("Product added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <div className="p-4">
        <h2 className="text-2xl text-center mb-4">Add New Product</h2>
        <div className="bg-emerald-">
          <form onSubmit={formSubmitHandler} className="w-3/4 md:w-2/4 mx-auto">
            <div className="mb-3 p-2">
              <label htmlFor="name" className="block">
                Product Name:
              </label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                placeholder="Name"
                className="w-full rounded-md px-2 py-1 shadow-md"
              />
            </div>
            <div className="mb-2 p-2">
              <label htmlFor="category" className="block">
                Product Category:{" "}
              </label>
              <input
                type="text"
                id="category"
                ref={categoryRef}
                placeholder="Category"
                className="w-full rounded-md px-2 py-1 shadow-md"
              />
            </div>

            <div className="p-2 text-center">
              <button
                type="submit"
                className="p-2 bg-sky-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
