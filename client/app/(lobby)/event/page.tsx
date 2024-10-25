import React from "react";
import EventList from "../../components/EventList";

import axios from "axios";
const page = async () => {
  const response = await axios.post("http://localhost:3000/v1/event");

  return (
    <div>
      <EventList events={response.data} />
    </div>
  );
};

export default page;
