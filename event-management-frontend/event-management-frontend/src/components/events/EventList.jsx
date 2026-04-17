import { useEffect, useState } from "react";
import API from "../../api/axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    API.get("?route=events").then(res => setEvents(res.data));
  }, []);

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-[#2f2f2f] sm:text-2xl">Events</h2>

      {events.map(e => (
        <div
          key={e.id}
          onClick={() => setSelectedEvent(e)}
          className="mb-3 cursor-pointer rounded border border-[#edd9e8] bg-[#faf4f8] p-3 transition hover:bg-[#f4e8f0]"
        >
          <p className="font-semibold text-[#6c1d4f] wrap-break-word">{e.title}</p>
          <p className="text-sm text-gray-600">{e.event_date}</p>
        </div>
      ))}

      {/* 🔥 Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-xl sm:p-6">
            <h2 className="mb-2 text-lg font-bold text-[#2f2f2f] sm:text-xl wrap-break-word">
              {selectedEvent.title}
            </h2>

            <p className="mb-3 text-gray-700">{selectedEvent.description}</p>
            <p className="mb-1 text-sm"><b>Date:</b> {selectedEvent.event_date}</p>
            <p className="mb-1 text-sm"><b>Location:</b> {selectedEvent.location}</p>
            <p className="text-sm"><b>Seats:</b> {selectedEvent.total_seats}</p>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-5 rounded bg-[#6c1d4f] px-4 py-2 text-white transition hover:bg-[#581940]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventList;