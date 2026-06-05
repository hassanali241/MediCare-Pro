import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdminContext } from "../context/AdminContext";
import adminApi from "../services/adminApi";
import { RiShieldCheckLine } from "react-icons/ri";

const SignInForm = () => {
  const { loginAdmin } = useAdminContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", role: "admin" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await adminApi.post("/auth/sign-in", form);
      toast.success(data.message);
      loginAdmin(data.account);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.iconWrap}>
            <RiShieldCheckLine style={{ fontSize: 32, color: "#2563eb" }} />
          </div>
          <h1 style={s.title}>Admin Sign In</h1>
          <p style={s.subtitle}>Access the MediCare Pro admin dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={s.group}>
            <label style={s.lbl}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="admin@medicare.com" style={s.inp} required />
          </div>
          <div style={s.group}>
            <label style={s.lbl}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" style={s.inp} required />
          </div>
          <button type="submit" disabled={loading} style={s.btn}>
            {loading ? "Signing In..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

const s = {
  page: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", background: "#f8fafc" },
  card: {
    width: 420, background: "#ffffff",
    border: "1px solid #e2e8f0", borderRadius: 16, padding: 40,
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  header: { textAlign: "center", marginBottom: 32 },
  iconWrap: {
    width: 64, height: 64, borderRadius: 16, background: "#eff6ff",
    border: "1px solid #bfdbfe", display: "flex", alignItems: "center",
    justifyContent: "center", margin: "0 auto 16px",
  },
  title: { fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", marginBottom: 8 },
  subtitle: { fontSize: "0.9rem", color: "#64748b" },
  group: { marginBottom: 20 },
  lbl: { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: 8 },
  inp: {
    width: "100%", padding: "12px 16px", background: "#f8fafc",
    border: "1px solid #e2e8f0", borderRadius: 8,
    color: "#1e293b", fontSize: "0.95rem", fontFamily: "Inter, sans-serif", outline: "none",
  },
  btn: {
    width: "100%", padding: "12px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
    color: "white", background: "#2563eb",
    border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif",
  },
};

export default SignInForm;
