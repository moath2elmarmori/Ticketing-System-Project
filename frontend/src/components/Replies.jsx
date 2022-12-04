import React from "react";
import ReplyRow from "./ReplyRow";

function Replies({ replies }) {
  return (
    <div className="my-6 px-4">
      <>
        {replies.length !== 0 ? (
          <>
            <h1 className="text-xl font-bold my-4">Replies:</h1>
            <table className="read-only-table">
              <thead>
                <tr>
                  <th>Replied By</th>
                  <th>Replied At</th>
                  <th>User Role</th>
                  <th>Reply Text</th>
                </tr>
              </thead>
              <tbody>
                {replies.map((reply) => (
                  <ReplyRow key={reply._id} replyData={reply} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold">No Replies For This Ticket</h1>
          </>
        )}
      </>
    </div>
  );
}

export default Replies;
