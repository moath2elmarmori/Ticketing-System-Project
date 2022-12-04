import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../queries/productQueries";
import NewTicketCard from "./NewTicketCard";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { GET_TICKETS_BY_PRODUCT_ID } from "../queries/ticketQueries";
import TicketRow from "./TicketRow";

function SingleProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
  });

  const { loading: ticketLoading, data: ticketsData } = useQuery(
    GET_TICKETS_BY_PRODUCT_ID,
    {
      variables: { id: productId },
    }
  );

  if (error) {
    toast.error("Product doesn't exists");
    navigate("/products");
  }
  if (loading || ticketLoading) {
    return <Spinner />;
  }
  return (
    <>
      {!loading && data && (
        <div className="pt-8">
          <NewTicketCard productData={data.getProductById} />
        </div>
      )}
      <div className="my-6 px-4">
        {ticketsData && ticketsData.getTicketsByProductId.length !== 0 ? (
          <>
            <h1 className="text-xl my-4">Tickets For This Product</h1>
            <table className="read-only-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Classification</th>
                  <th>status</th>
                  <th>Ticket Text</th>
                  <th className="detail-head-cell">Details</th>
                </tr>
              </thead>
              <tbody>
                {ticketsData.getTicketsByProductId.map((ticket) => (
                  <TicketRow key={ticket._id} ticketData={ticket} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>
            <h1 className="text-xl text-center my-8 font-bold">
              No Tickets For This Product, Yet!
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default SingleProduct;
