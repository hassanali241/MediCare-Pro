import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";
import { RiLockLine } from "react-icons/ri";

const SignInPage = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/sign-in", form);
      toast.success(data.message);
      setUser(data.account);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconWrap}>
              <RiLockLine style={{ fontSize: 28, color: "#2563eb" }} />
            </div>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Sign in to your MediCare Pro account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.group}>
              <label style={styles.lbl}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" style={styles.inp} required />
            </div>
            <div style={styles.group}>
              <label style={styles.lbl}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" style={styles.inp} required />
            </div>
            <div style={styles.group}>
              <label style={styles.lbl}>Sign in as</label>
              <select name="role" value={form.role} onChange={handleChange} style={styles.sel}>
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" disabled={loading} style={styles.btn}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p style={styles.footer}>
            Don't have an account?{" "}
            <Link to="/sign-up" style={styles.link}>Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 72, background: "#f8fafc" },
  container: { maxWidth: 440, margin: "0 auto", padding: "0 24px", width: "100%" },
  card: {
    background: "#ffffff", border: "1px solid #e2e8f0",
    borderRadius: 16, padding: 40, boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  header: { textAlign: "center", marginBottom: 32 },
  iconWrap: {
    width: 56, height: 56, borderRadius: 12, background: "#eff6ff",
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
  sel: {
    width: "100%", padding: "12px 16px", background: "#f8fafc",
    border: "1px solid #e2e8f0", borderRadius: 8,
    color: "#1e293b", fontSize: "0.95rem", fontFamily: "Inter, sans-serif", outline: "none", cursor: "pointer",
  },
  btn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "12px 32px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
    color: "white", background: "#2563eb", border: "none", cursor: "pointer",
    width: "100%", fontFamily: "Inter, sans-serif",
  },
  footer: { textAlign: "center", marginTop: 24, fontSize: "0.9rem", color: "#64748b" },
  link: { color: "#2563eb", fontWeight: 600, textDecoration: "none" },
};

export default SignInPage;
