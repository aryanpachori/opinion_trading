"use client";

import OrderBook from "@/components/landing/Orderbook";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  console.log("id:",id);
  const eventId = Array.isArray(id) ? id[id.length - 1] : id;
 console.log(eventId)
  if (!eventId) {
    return <div>Error: Event ID not found</div>;
  }
  return (
    <div>
      <OrderBook eventId={eventId} />
    </div>
  );
}
