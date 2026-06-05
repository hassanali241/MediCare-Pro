import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";
import { RiUserAddLine } from "react-icons/ri";

const SignUpPage = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    cnic: "",
    dateOfBirth: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      toast.success(data.message);
      setUser(data.account);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
              <RiUserAddLine style={{ fontSize: 28, color: "#2563eb" }} />
            </div>
            <h1 style={styles.title}>Create Account</h1>
            <p style={styles.subtitle}>Join MediCare Pro to book appointments and manage your health</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.group}>
              <label style={styles.lbl}>Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" style={styles.inp} required />
            </div>
            <div style={styles.row}>
              <div style={styles.group}>
                <label style={styles.lbl}>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" style={styles.inp} required />
              </div>
              <div style={styles.group}>
                <label style={styles.lbl}>Phone</label>
                <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="03001234567" style={styles.inp} required />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.group}>
                <label style={styles.lbl}>CNIC</label>
                <input name="cnic" value={form.cnic} onChange={handleChange} placeholder="3520212345678" style={styles.inp} required />
              </div>
              <div style={styles.group}>
                <label style={styles.lbl}>Date of Birth</label>
                <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} style={styles.inp} required />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.group}>
                <label style={styles.lbl}>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} style={styles.sel} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={styles.group}>
                <label style={styles.lbl}>Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters" style={styles.inp} required />
              </div>
            </div>
            <button type="submit" disabled={loading} style={styles.btn}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <p style={styles.footer}>
            Already have an account?{" "}
            <Link to="/sign-in" style={styles.link}>Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 72, paddingBottom: 40, background: "#f8fafc" },
  container: { maxWidth: 580, margin: "0 auto", padding: "0 24px", width: "100%" },
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
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
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
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "12px 32px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
    color: "white", background: "#2563eb", border: "none", cursor: "pointer",
    width: "100%", fontFamily: "Inter, sans-serif",
  },
  footer: { textAlign: "center", marginTop: 24, fontSize: "0.9rem", color: "#64748b" },
  link: { color: "#2563eb", fontWeight: 600, textDecoration: "none" },
};

export default SignUpPage;
