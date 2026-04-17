import { useState } from "react";
import API from "../../api/axios";

const NoticeForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("?route=notices", { title });
      alert("Notice added");
      setTitle("");
    } catch {
      alert("Error adding notice");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:flex-row sm:p-6"
    >
      <input
        className="flex-1 rounded border border-[#d9d9df] p-2.5 outline-none focus:border-[#6c1d4f]"
        placeholder="Enter notice"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="rounded bg-[#6c1d4f] px-4 py-2 text-white transition hover:bg-[#581940]">
        Add
      </button>
    </form>
  );
};

export default NoticeForm;