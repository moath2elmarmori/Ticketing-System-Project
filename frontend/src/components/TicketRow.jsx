import { AiOutlineBars } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function TicketRow({ ticketData }) {
  const navigate = useNavigate();
  const ticketDetailClickHandler = () => {
    navigate(`/products/${ticketData.product}/tickets/${ticketData._id}`);
  };
  return (
    <>
      <tr>
        <td>{ticketData.user.username}</td>
        <td>{ticketData.classification}</td>
        <td>{ticketData.status}</td>
        <td className="ticket-text-cell">{ticketData.ticketText}</td>
        <td className="ticket-detail-icon-cell">
          <AiOutlineBars onClick={ticketDetailClickHandler} />
        </td>
      </tr>
    </>
  );
}

export default TicketRow;
