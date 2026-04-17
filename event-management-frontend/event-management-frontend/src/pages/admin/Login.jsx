import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("?route=login", form);

      // 🔥 confirm session properly
      await API.get("?route=check-auth");

      login();
      navigate("/admin/dashboard");

    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f2f2]">

      {/* 🔥 Navbar */}
      <Navbar />

      {/* 🔥 Centered Login Form */}
      <main className="flex grow items-center justify-center px-4 py-6 sm:py-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded bg-white p-5 shadow sm:p-6"
        >
          <h2 className="mb-4 text-xl font-bold text-center">
            Admin Login
          </h2>

          <input
            className="mb-3 w-full border p-2"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            className="mb-3 w-full border p-2"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6c1d4f] py-2 text-white rounded hover:bg-[#581940] disabled:bg-gray-400 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </main>

      {/* 🔥 Footer */}
      <Footer />

    </div>
  );
};

export default Login;