import { useMutation } from "@apollo/client";
import { useRef, useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ADD_NEW_TICKET } from "../mutations/ticketMutations";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  GET_ALL_TICKETS_BY_COMPANY_ID,
  GET_TICKETS_BY_PRODUCT_ID,
} from "../queries/ticketQueries";
import AuthContext from "../context/auth-context";
import { getUserById } from "../queries/userQueries";

function NewTicketForm() {
  const { companyId, userId } = useContext(AuthContext);
  const textareaRef = useRef();
  const { productId } = useParams();
  const [addNewTicket, { loading }] = useMutation(ADD_NEW_TICKET, {
    context: {
      headers: {
        authorization: localStorage.getItem("user")
          ? `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          : "",
      },
    },
    update: (cache, { data: { addNewTicket } }) => {
      const ticketsForProductInCache = cache.readQuery({
        query: GET_TICKETS_BY_PRODUCT_ID,
        variables: { id: productId },
      });
      if (ticketsForProductInCache) {
        const newData = [
          ...ticketsForProductInCache.getTicketsByProductId,
          addNewTicket,
        ];
        cache.writeQuery({
          query: GET_TICKETS_BY_PRODUCT_ID,
          variables: { id: productId },
          data: { getTicketsByProductId: newData },
        });
      }

      const ticketsForCompanyInCache = cache.readQuery({
        query: GET_ALL_TICKETS_BY_COMPANY_ID,
        variables: { id: companyId },
      });
      if (ticketsForCompanyInCache) {
        const newData = [
          ...ticketsForCompanyInCache.getAllTicketsByCompanyId,
          addNewTicket,
        ];
        cache.writeQuery({
          query: GET_ALL_TICKETS_BY_COMPANY_ID,
          variables: { id: companyId },
          data: { getAllTicketsByCompanyId: newData },
        });
      }

      const statisticsPageData = cache.readQuery({
        query: getUserById,
        variables: { id: userId },
      });
      if (statisticsPageData) {
        const clonedData = { ...statisticsPageData.getUserById };
        const newTickets = [...clonedData.tickets, addNewTicket];
        clonedData.tickets = newTickets;
        cache.writeQuery({
          query: getUserById,
          variables: { id: userId },
          data: { getUserById: clonedData },
        });
      }
    },
  });
  const [queryString] = useSearchParams();
  const classification = queryString.get("classification");
  const status = queryString.get("status");

  const navigate = useNavigate();
  const backButtonHandler = (e) => {
    e.preventDefault();
    navigate(`/products/${productId}`);
  };
  const submitButtonHandler = async (e) => {
    e.preventDefault();
    const ticketData = {
      classification,
      status,
      ticketText: textareaRef.current.value,
      product: productId,
    };
    try {
      await addNewTicket({ variables: ticketData });
      toast.success("Ticket added successfully");
      navigate(`/products/${productId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="px-4 pt-8">
      <form action="">
        <div className="px-4">
          <div className="new-ticket-form-div mb-6 flex gap-x-4">
            <label htmlFor="ticket-text" className="font-bold w-24">
              Ticket Text:
            </label>
            <textarea
              name="ticketText"
              id="ticket-text"
              rows={5}
              className="w-3/4 flex-1 border border-neutral-400 rounded-md p-2"
              ref={textareaRef}
            ></textarea>
          </div>
          <div className="new-ticket-form-div mb-6 flex gap-x-4">
            <p className="font-bold w-24">Classification:</p>
            <p className="font-bold">{classification}</p>
          </div>
          <div className="new-ticket-form-div mb-6 flex gap-x-4">
            <p className="font-bold w-24">Status:</p>
            <p className="font-bold">{status}</p>
          </div>
          <div className="mb-6">
            <button
              className="py-2 px-3 bg-cyan-600 text-white mr-2 rounded-md hover:bg-cyan-700"
              onClick={submitButtonHandler}
            >
              Submit
            </button>
            <button
              className="py-2 px-3 bg-slate-400 rounded-md hover:bg-slate-600 text-white"
              onClick={backButtonHandler}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewTicketForm;
