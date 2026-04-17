import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/admin/login");
  }, [isAdmin, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f2f2]">

      <Navbar />

      {/* 🔥 MAIN */}
      <main className="mx-auto w-full max-w-7xl grow px-4 py-8 sm:px-6 sm:py-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2f2f2f] sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your platform efficiently using the tools below.
          </p>
        </div>

        {/* 🔥 ACTION CARDS */}
        <div className="grid gap-6 sm:grid-cols-2">

          {/* EVENTS CARD */}
          <div
            onClick={() => navigate("/admin/events")}
            className="cursor-pointer rounded-lg bg-white p-6 shadow transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-[#6c1d4f]">
              Manage Events
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Create, update, and delete events for users.
            </p>

            <button className="mt-4 rounded bg-[#6c1d4f] px-4 py-2 text-white hover:bg-[#581940]">
              Go to Events →
            </button>
          </div>

          {/* NOTICES CARD */}
          <div
            onClick={() => navigate("/admin/notices")}
            className="cursor-pointer rounded-lg bg-white p-6 shadow transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-[#6c1d4f]">
              Manage Notices
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Add and manage important notices for users.
            </p>

            <button className="mt-4 rounded bg-[#6c1d4f] px-4 py-2 text-white hover:bg-[#581940]">
              Go to Notices →
            </button>
          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Dashboard;