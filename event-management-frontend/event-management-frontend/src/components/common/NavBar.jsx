import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import gbuLogo from "../../assets/GBU_logo-removebg-preview-removebg-preview.png";

const Navbar = () => {
  const { isAdmin, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("?route=logout");
    } catch (err) {
      console.log("Logout error:", err);
    }

    logout();
    navigate("/");
  };

  // 🔥 Prevent flicker during auth check
  if (loading) return null;

  return (
    <header className="bg-[#6c1d4f] px-3 py-3 text-white shadow-sm sm:px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-3 md:grid-cols-[auto_1fr_auto]">

        {/* 🔥 LEFT: LOGO + UNIVERSITY TEXT */}
        <div
          className="flex min-w-0 items-center gap-2 cursor-pointer sm:gap-3"
          onClick={() => navigate("/")}
        >
          <img
            src={gbuLogo}
            alt="GBU Logo"
            className="h-10 w-auto sm:h-14"
          />

          <div className="min-w-0 leading-tight">
            <p className="truncate text-[10px] font-semibold sm:text-xs">
              गौतम बुद्ध विश्वविद्यालय
            </p>

            <p className="truncate text-sm font-bold tracking-wide sm:text-lg">
              GAUTAM BUDDHA UNIVERSITY
            </p>

            <p className="truncate text-[10px] text-white/80 sm:text-[11px]">
              An Ultimate Destination for Higher Learning
            </p>
          </div>
        </div>

        {/* 🔥 CENTER (optional spacing / future use) */}
        <div></div>

        {/* 🔥 RIGHT: NAVIGATION */}
        <nav className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium sm:text-sm md:justify-end">

          <Link
            to="/"
            className="rounded border border-white/25 px-2.5 py-1 hover:bg-white/10 transition sm:px-3"
          >
            Home
          </Link>

          {isAdmin && (
            <>
              <Link
                to="/admin/dashboard"
                className="rounded border border-white/25 px-2.5 py-1 hover:bg-white/10 transition sm:px-3"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/events"
                className="rounded border border-white/25 px-2.5 py-1 hover:bg-white/10 transition sm:px-3"
              >
                Events
              </Link>

              <Link
                to="/admin/notices"
                className="rounded border border-white/25 px-2.5 py-1 hover:bg-white/10 transition sm:px-3"
              >
                Notices
              </Link>
            </>
          )}

          {!isAdmin ? (
            <Link
              to="/admin/login"
              className="rounded bg-white px-2.5 py-1 text-[#6c1d4f] hover:bg-[#f2e4ed] transition sm:px-3"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded bg-white/15 px-2.5 py-1 hover:bg-white/25 transition sm:px-3"
            >
              Logout
            </button>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;