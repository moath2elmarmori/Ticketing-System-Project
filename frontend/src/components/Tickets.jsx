import React from "react";

function Tickets() {
  return (
    <div className="my-4">
      <h2 className="text-xl">Tickets For This Products</h2>
      <table className="custom-table border-collapse border border-slate-500 my-6 w-full table-fixed text-center transition-300">
        <thead>
          <tr>
            <th className=" border-slate-600">Actions</th>
            <th className=" border-slate-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className=" border-slate-700">Products Added</td>
            <td className=" border-slate-700">65464</td>
          </tr>
          <tr>
            <td className=" border-slate-700">Tickets Made</td>
            <td className=" border-slate-700">5454</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tickets;
