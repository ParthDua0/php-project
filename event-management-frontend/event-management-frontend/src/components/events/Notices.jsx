import { useEffect, useState } from "react";
import API from "../../api/axios";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    API.get("?route=notices")
      .then(res => setNotices(res.data));
  }, []);

  return (
    <section className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-[#2f2f2f] sm:text-2xl">Notices</h2>

      <ul className="space-y-2">
        {notices.map(n => (
          <li
            key={n.id}
            className="rounded border border-[#edd9e8] bg-[#faf4f8] px-3 py-2 text-[#6c1d4f] wrap-break-word"
          >
            {n.title}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Notices;