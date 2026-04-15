import { useEffect, useState } from "react";
import API from "../../api/axios";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    API.get("?route=notices")
      .then(res => setNotices(res.data));
  }, []);

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h2 className="mb-4 text-2xl font-bold text-[#2f2f2f]">Notices</h2>

      <ul className="space-y-2">
        {notices.map(n => (
          <li
            key={n.id}
            className="rounded border border-[#edd9e8] bg-[#faf4f8] px-3 py-2 text-[#6c1d4f]"
          >
            {n.title}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Notices;