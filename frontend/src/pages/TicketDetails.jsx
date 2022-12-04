import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_TICKET_BY_ID } from "../queries/ticketQueries";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import AddReply from "../components/AddReply";
import AuthContext from "../context/auth-context";
import Replies from "../components/Replies";

function TicketDetails() {
  const { userRole } = useContext(AuthContext);
  const { productId, ticketId } = useParams();
  const navigate = useNavigate();
  const convertMillisecondsToDate = (milliseconds) => {
    return new Date(milliseconds).toLocaleString("en-US");
  };

  const { loading, data, error } = useQuery(GET_TICKET_BY_ID, {
    variables: { id: ticketId },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
    return navigate(`/products/${productId}`);
  }

  return (
    <>
      {!loading && data && (
        <>
          <div className="pt-8">
            <h1 className="text-center text-2xl">Ticket Detail</h1>
            <div className="my-10 px-4">
              <div className="my-6">
                <button
                  onClick={() => navigate(`/products/${productId}`)}
                  className="py-2 px-3 bg-slate-300 rounded-md duration-300 hover:bg-slate-600 hover:text-white"
                >
                  Product Page
                </button>
              </div>
              <div className="ticket-details-div flex gap-x-6 mb-6">
                <p className="w-28 font-bold">Ticket Text:</p>
                <p className="break-all">{data.getTicketById.ticketText}</p>
              </div>
              <div className="ticket-details-div flex gap-x-6 mb-6">
                <p className="w-28 font-bold">Ticketed At:</p>
                <p className="break-all">
                  {convertMillisecondsToDate(data.getTicketById.createdAt)}
                </p>
              </div>
              <div className="ticket-details-div flex gap-x-6 mb-6">
                <p className="w-28 font-bold">Ticketed By:</p>
                <p>{data.getTicketById.user.username}</p>
              </div>
              <div className="ticket-details-div flex gap-x-6 mb-6">
                <p className="w-28 font-bold">Classificatoin:</p>
                <p>{data.getTicketById.classification}</p>
              </div>
              <div className="ticket-details-div flex gap-x-6 mb-6">
                <p className="w-28 font-bold">Status: </p>
                <p>{data.getTicketById.status}</p>
              </div>
              <div className="ticket-details-div flex gap-x-6 mb-6">
                <p className="w-28 font-bold">User Role: </p>
                <p>{data.getTicketById.user.role}</p>
              </div>
            </div>
          </div>
          <div className="my-6">
            <Replies replies={data.getTicketById.replies} />
          </div>
        </>
      )}

      {userRole !== "Agent" && data.getTicketById.status === "Open" && (
        <AddReply />
      )}
    </>
  );
}

export default TicketDetails;
