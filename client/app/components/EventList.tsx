/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
}

interface EventListProps {
  events: Record<string, { title: string; description: string }>;
}

const getRandomAvatar = (seed: string) =>
  `https://api.dicebear.com/9.x/identicon/svg?seed=${seed}`;

const EventCard = ({ event }: { event: Event }) => {
  const avatarUrl = getRandomAvatar(event.id);

  return (
    <Card className="mb-4 bg-gray-800 text-white">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-2">
          <img
            src={avatarUrl}
            alt="Event Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-grow">
            <Link href={`/event/${event.id}`}>
              <h3 className="font-semibold text-sm">{event.title}</h3>
            </Link>
          </div>
        </div>
        <p className="mt-2">
          {event.description.slice(0, 100).toLowerCase()}
          <span className="font-bold text-blue-500"> read more..</span>
        </p>
        <div className="flex justify-between mt-5">
          <Button variant="default">Yes ₹</Button>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
            No ₹
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function EventList({ events }: EventListProps) {
  const eventsArray = Object.entries(events).map(([id, event]) => ({
    id,
    title: event.title,
    description: event.description,
  }));

  if (eventsArray.length === 0) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <h2 className="text-xl text-white">No events available</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="font-medium text-center text-4xl text-white mb-6">
        All Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {eventsArray.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
