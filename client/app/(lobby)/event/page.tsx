import React from "react";
import EventList from "../../components/EventList";

import axios from "axios";

const page = async () => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event`);

  return (
    <div>
      <EventList events={response.data} />
    </div>
  );
};

export default page;
