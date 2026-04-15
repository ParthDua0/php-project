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
    <header className="bg-[#6c1d4f] px-6 py-3 text-white shadow-sm">
      <div className="mx-auto grid max-w-7xl items-center gap-3 md:grid-cols-[auto_1fr_auto]">

        {/* 🔥 LEFT: LOGO + UNIVERSITY TEXT */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={gbuLogo}
            alt="GBU Logo"
            className="h-14 w-auto"
          />

          <div className="leading-tight">
            <p className="text-xs font-semibold">
              गौतम बुद्ध विश्वविद्यालय
            </p>

            <p className="text-lg font-bold tracking-wide">
              GAUTAM BUDDHA UNIVERSITY
            </p>

            <p className="text-[11px] text-white/80">
              An Ultimate Destination for Higher Learning
            </p>
          </div>
        </div>

        {/* 🔥 CENTER (optional spacing / future use) */}
        <div></div>

        {/* 🔥 RIGHT: NAVIGATION */}
        <nav className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium md:justify-end">

          <Link
            to="/"
            className="rounded border border-white/25 px-3 py-1 hover:bg-white/10 transition"
          >
            Home
          </Link>

          {isAdmin && (
            <>
              <Link
                to="/admin/dashboard"
                className="rounded border border-white/25 px-3 py-1 hover:bg-white/10 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/events"
                className="rounded border border-white/25 px-3 py-1 hover:bg-white/10 transition"
              >
                Events
              </Link>

              <Link
                to="/admin/notices"
                className="rounded border border-white/25 px-3 py-1 hover:bg-white/10 transition"
              >
                Notices
              </Link>
            </>
          )}

          {!isAdmin ? (
            <Link
              to="/admin/login"
              className="rounded bg-white px-3 py-1 text-[#6c1d4f] hover:bg-[#f2e4ed] transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded bg-white/15 px-3 py-1 hover:bg-white/25 transition"
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