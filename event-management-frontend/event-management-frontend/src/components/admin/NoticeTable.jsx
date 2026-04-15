import { useEffect, useState } from "react";
import API from "../../api/axios";

const NoticeTable = () => {
  const [notices, setNotices] = useState([]);

  const fetchNotices = () => {
    API.get("?route=notices")
      .then(res => setNotices(res.data))
      .catch(() => setNotices([]));
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const deleteNotice = async (id) => {
    try {
      await API.delete(`?route=notices/${id}`);
      fetchNotices(); 
    } catch {
      alert("Error deleting notice");
    }
  };

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h2 className="mb-4 text-xl font-semibold text-[#2f2f2f]">All Notices</h2>

      {notices.length === 0 ? (
        <p className="text-sm text-gray-600">No notices available</p>
      ) : (
        notices.map(n => (
          <div
            key={n.id}
            className="mb-2 flex items-center justify-between rounded border border-[#edd9e8] bg-[#faf4f8] p-3"
          >
            <span className="font-medium text-[#6c1d4f]">{n.title}</span>

            <button
              onClick={() => deleteNotice(n.id)}
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

export default NoticeTable;