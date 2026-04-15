import { useState } from "react";
import API from "../../api/axios";

const EventForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    event_date: "",
    location: "",
    total_seats: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("?route=events", form);
      alert("Event created");
    } catch {
      alert("Error creating event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100"
    >
      <h2 className="text-xl font-semibold text-[#2f2f2f]">Create Event</h2>

      <input placeholder="Title" className="w-full rounded border border-[#d9d9df] p-2.5 outline-none focus:border-[#6c1d4f]"
        onChange={(e) => setForm({ ...form, title: e.target.value })} />

      <input placeholder="Category" className="w-full rounded border border-[#d9d9df] p-2.5 outline-none focus:border-[#6c1d4f]"
        onChange={(e) => setForm({ ...form, category: e.target.value })} />

      <input type="datetime-local" className="w-full rounded border border-[#d9d9df] p-2.5 outline-none focus:border-[#6c1d4f]"
        onChange={(e) => setForm({ ...form, event_date: e.target.value })} />

      <input placeholder="Location" className="w-full rounded border border-[#d9d9df] p-2.5 outline-none focus:border-[#6c1d4f]"
        onChange={(e) => setForm({ ...form, location: e.target.value })} />

      <input placeholder="Seats" className="w-full rounded border border-[#d9d9df] p-2.5 outline-none focus:border-[#6c1d4f]"
        onChange={(e) => setForm({ ...form, total_seats: e.target.value })} />

      <button className="rounded bg-[#6c1d4f] px-4 py-2 text-white transition hover:bg-[#581940]">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;