import React from "react";

function ReplyRow({ replyData }) {
  // conver the milliseconds from (createdAt) property to a readable date
  const replyCreatedAt = new Date(replyData.createdAt).toLocaleString("en-US");
  return (
    <>
      <tr>
        <td>{replyData.user.username}</td>
        <td>{replyCreatedAt}</td>
        <td>{replyData.user.role}</td>
        <td className="ticket-text-cell">{replyData.replyText}</td>
      </tr>
    </>
  );
}

export default ReplyRow;
