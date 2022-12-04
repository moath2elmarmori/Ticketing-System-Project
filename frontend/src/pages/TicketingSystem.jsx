import React from "react";
import SearchTicketCard from "../components/SearchProductsCard";

function TicketingSystem() {
  return (
    <div>
      <h1 className="text-2xl text-center py-6 mb-4">Ticketing System</h1>
      <div className="p-4">
        <SearchTicketCard />
        <div className="my-6"></div>
      </div>
    </div>
  );
}

export default TicketingSystem;
