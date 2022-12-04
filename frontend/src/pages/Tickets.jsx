import { useQuery } from "@apollo/client";
import { useContext } from "react";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth-context";
import { GET_ALL_TICKETS_BY_COMPANY_ID } from "../queries/ticketQueries";
import TicketRow from "../components/TicketRow";

function Tickets() {
  const { companyId } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_ALL_TICKETS_BY_COMPANY_ID, {
    variables: { id: companyId },
  });

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-2xl text-center pt-6 mb-3">Tickets</h1>
      <div className="px-4">
        <>
          {!loading && data.getAllTicketsByCompanyId.length !== 0 ? (
            <>
              <h1 className="my-6 font-bold text-2xl">
                {data.getAllTicketsByCompanyId.length} Tickets
              </h1>
              <table className="read-only-table">
                <thead>
                  <tr>
                    <th>Ticketed By</th>
                    <th>Classfifcation</th>
                    <th>Status</th>
                    <th>Ticket Text</th>
                    <th className="detail-head-cell">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getAllTicketsByCompanyId.map((ticket) => (
                    <TicketRow key={ticket._id} ticketData={ticket} />
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center">
                No Tickets, Yet!
              </h1>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Tickets;
