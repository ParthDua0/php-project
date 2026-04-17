import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import NoticeForm from "../../components/admin/NoticeForm";
import NoticeTable from "../../components/admin/NoticeTable";

const ManageNotices = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f2f2]">

      {/*Navbar */}
      <Navbar />

      {/*Main Content */}
      <main className="mx-auto w-full max-w-7xl grow px-4 py-6 sm:px-6 sm:py-8">

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6 rounded bg-[#6c1d4f] px-4 py-2 text-white transition hover:bg-[#581940]"
        >
          ← Back
        </button>

        <h1 className="mb-6 text-2xl font-bold text-[#2f2f2f] sm:text-3xl">
          Manage Notices
        </h1>

        <div className="space-y-6">
          <NoticeForm />
          <NoticeTable />
        </div>

      </main>

      {/*Footer */}
      <Footer />

    </div>
  );
};

export default ManageNotices;