import React from "react";

function UserRow({ userData, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{userData.username}</td>
      <td>{userData.products.length}</td>
      <td>{userData.tickets.length}</td>
    </tr>
  );
}

export default UserRow;
