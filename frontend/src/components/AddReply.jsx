import { useMutation } from "@apollo/client";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ADD_REPLY } from "../mutations/replyMutations";
import { toast } from "react-toastify";
import { GET_TICKET_BY_ID } from "../queries/ticketQueries";
import Spinner from "../components/Spinner";

function AddReply() {
  const [isAddingReply, setIsAddingReply] = useState(false);
  const replyTextRef = useRef();
  const { ticketId } = useParams();
  const [addReply, { loading }] = useMutation(ADD_REPLY, {
    context: {
      headers: {
        authorization: localStorage.getItem("user")
          ? `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          : "",
      },
    },
    refetchQueries: [{ query: GET_TICKET_BY_ID, variables: { id: ticketId } }],
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const replyData = {
      replyText: replyTextRef.current.value,
      ticketId,
    };
    try {
      await addReply({ variables: replyData });
      toast.success("Reply added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-4">
      <button
        className="bg-cyan-600 py-2 px-3 rounded-md text-white"
        onClick={() => setIsAddingReply((prevState) => !prevState)}
      >
        {isAddingReply ? "Cancel Reply" : "Add Reply"}
      </button>
      <div className={`my-6 reply-container ${isAddingReply ? "active" : ""}`}>
        <form onSubmit={formSubmitHandler}>
          <div className="my-4">
            <textarea
              name="reply-text"
              id="reply-text"
              placeholder="Reply Text"
              className="p-2 w-full"
              ref={replyTextRef}
            ></textarea>
          </div>
          <button className="bg-emerald-600 py-2 px-3 rounded-md text-white">
            Reply
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddReply;
