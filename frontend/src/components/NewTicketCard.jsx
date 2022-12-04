import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewTicketCard({ productData }) {
  const selectRef = useRef();
  const navigate = useNavigate();
  const buttonClickedHandler = (e) => {
    e.preventDefault();
    const buttonText = e.target.innerText;
    if (!selectRef.current.value) {
      toast.error("You have to choose a classification");
    } else {
      navigate(
        `/products/${productData._id}/new-ticket?classification=${selectRef.current.value}&status=${buttonText}`
      );
    }
  };
  return (
    <div className="px-4">
      <div className="mb-6">
        <div className="ticket-card rounded-xl">
          <h4 className="text-xl p-4 bg-cyan-700 text-white rounded-t-xl">
            New Ticket Card
          </h4>
          <form className="px-16">
            <div className="px-4 my-4">
              <h2 className="text-xl font-bold">{productData.name}</h2>
            </div>
            <div className="p-4 text-left">
              <label htmlFor="classification" className="block font-bold">
                Classification:
              </label>
              <select
                name="classification"
                id="classification"
                className="border rounded-md border-stone-700 w-full"
                ref={selectRef}
              >
                <option value="">--Please Select--</option>
                <option value="Problem">Problem</option>
                <option value="Appreciation">Appreciation</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>
            <div className="p-4">
              <button
                className="py-2 px-3 mr-2 font-medium rounded-md bg-cyan-600  text-white"
                onClick={buttonClickedHandler}
              >
                Close
              </button>
              <button
                className="py-2 px-3 mr-2 font-medium rounded-md bg-red-800 text-white"
                onClick={buttonClickedHandler}
              >
                Open
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default NewTicketCard;
