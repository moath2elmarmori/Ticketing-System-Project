import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { GET_TICKETS_BY_USER_ID } from "../queries/ticketQueries";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import TicketRow from "../components/TicketRow";

function MyTickets() {
  const { userId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_TICKETS_BY_USER_ID, {
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
      <h1 className="text-2xl text-center font-bold  mb-10">My Tickets</h1>
      {!loading && data.getTicketsByUserId.length !== 0 ? (
        <div>
          <h1 className="text-xl font-bold mb-4">
            {data.getTicketsByUserId.length} Tickets
          </h1>
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
              {data.getTicketsByUserId.map((ticket) => (
                <TicketRow key={ticket._id} ticketData={ticket} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold text-center">
            No Tickets Added By You, Yet!
          </h1>
        </>
      )}
    </div>
  );
}

export default MyTickets;
