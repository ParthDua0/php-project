const EventCard = ({ event }) => {
  return (
    <div className="border p-4 rounded shadow mb-3">
      <p className="text-sm text-gray-500">{event.event_date}</p>
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-gray-700">{event.description}</p>
      <p className="text-sm mt-2">{event.location}</p>
    </div>
  );
};

export default EventCard;