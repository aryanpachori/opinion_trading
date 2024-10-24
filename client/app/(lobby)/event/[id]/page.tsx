"use client";

import OrderBook from "@/components/landing/Orderbook";
import { useParams } from "next/navigation";
/*
  TODO: 
    1. server actiosn to fetch the event from the event id (not sure but for now).
    2. Add sources of truth.
    3. Add event details like name and all.
*/
export default function Page() {
  const { id } = useParams();
  console.log(id);
  const eventId = Array.isArray(id) ? id[id.length - 1] : id;

  if (!eventId) {
    return <div>Error: Event ID not found</div>;
  }
  return (
    <div>
      <OrderBook eventId={eventId} />
    </div>
  );
}
