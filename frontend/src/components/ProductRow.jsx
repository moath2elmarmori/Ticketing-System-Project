import React from "react";
import { useNavigate } from "react-router-dom";

function ProductRow({ productData }) {
  const navigate = useNavigate();
  const productClickHandler = () => {
    navigate(`/products/${productData._id}`);
  };
  return (
    <>
      <tr onClick={productClickHandler}>
        <td>{productData.name}</td>
        <td>{productData.category}</td>
        <td>{productData.createdBy.username}</td>
      </tr>
    </>
  );
}

export default ProductRow;
