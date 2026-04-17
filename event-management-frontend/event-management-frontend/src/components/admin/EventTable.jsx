import { useEffect, useState } from "react";
import API from "../../api/axios";

const EventTable = ({ refresh }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    API.get("?route=events")
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]));
  };

  useEffect(() => {
    fetchEvents();
  }, [refresh]);

  const deleteEvent = async (id) => {
    try {
      await API.delete(`?route=events/${id}`);
      fetchEvents();
    } catch {
      alert("Error deleting event");
    }
  };

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6">
      <h2 className="mb-4 text-xl font-semibold text-[#2f2f2f]">All Events</h2>

      {events.length === 0 ? (
        <p className="text-sm text-gray-600">No events available</p>
      ) : (
        events.map(event => (
          <div
            key={event.id}
            className="mb-2 flex flex-col items-start gap-2 rounded border border-[#edd9e8] bg-[#faf4f8] p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-medium text-[#6c1d4f] wrap-break-word">{event.title}</span>

            <button
              onClick={() => deleteEvent(event.id)}
              className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default EventTable;