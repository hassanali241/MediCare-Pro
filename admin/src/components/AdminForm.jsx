import React, { useState } from "react";
import { toast } from "react-toastify";
import adminApi from "../services/adminApi";
import { RiShieldUserLine } from "react-icons/ri";

const AdminForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", contactNumber: "", cnic: "",
    dateOfBirth: "", gender: "", password: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await adminApi.post("/staff/admin", form);
      toast.success(data.message);
      setForm({ fullName: "", email: "", contactNumber: "", cnic: "", dateOfBirth: "", gender: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={s.heading}>Create New Admin</h1>
      <p style={s.subheading}>Add a new administrator to the system</p>
      <div style={s.card}>
        <form onSubmit={handleSubmit}>
          <div style={s.group}>
            <label style={s.lbl}>Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Admin full name" style={s.inp} required />
          </div>
          <div style={s.row}>
            <div style={s.group}>
              <label style={s.lbl}>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="admin@email.com" style={s.inp} required />
            </div>
            <div style={s.group}>
              <label style={s.lbl}>Phone</label>
              <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="03001234567" style={s.inp} required />
            </div>
          </div>
          <div style={s.row}>
            <div style={s.group}>
              <label style={s.lbl}>CNIC</label>
              <input name="cnic" value={form.cnic} onChange={handleChange} placeholder="3520212345678" style={s.inp} required />
            </div>
            <div style={s.group}>
              <label style={s.lbl}>Date of Birth</label>
              <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} style={s.inp} required />
            </div>
          </div>
          <div style={s.row}>
            <div style={s.group}>
              <label style={s.lbl}>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} style={s.sel} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={s.group}>
              <label style={s.lbl}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters" style={s.inp} required />
            </div>
          </div>
          <button type="submit" disabled={loading} style={s.btn}>
            <RiShieldUserLine /> {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

const s = {
  heading: { fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", marginBottom: 4 },
  subheading: { fontSize: "0.9rem", color: "#64748b", marginBottom: 28 },
  card: {
    maxWidth: 600, background: "#ffffff", border: "1px solid #e2e8f0",
    borderRadius: 12, padding: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
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
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 28px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
    color: "white", background: "#2563eb",
    border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif",
    width: "100%", justifyContent: "center",
  },
};

export default AdminForm;
