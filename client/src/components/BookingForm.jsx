import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { RiCalendarLine } from "react-icons/ri";

const DEPARTMENTS = [
  "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology",
  "Radiology", "Physical Therapy", "Dermatology", "ENT",
];

const BookingForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    patientName: "", patientEmail: "", patientPhone: "", patientCnic: "",
    dateOfBirth: "", gender: "", scheduledDate: "", department: "",
    doctorId: "", address: "", remarks: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/staff/doctors");
        setDoctors(data.doctors);
      } catch {
        console.error("Could not load doctors");
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (form.department) {
      const matches = doctors.filter((d) => d.specialty === form.department);
      setFilteredDocs(matches);
      setForm((prev) => ({ ...prev, doctorId: "" }));
    } else {
      setFilteredDocs([]);
    }
  }, [form.department, doctors]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post("/bookings", form);
      toast.success(data.message);
      setForm({
        patientName: "", patientEmail: "", patientPhone: "", patientCnic: "",
        dateOfBirth: "", gender: "", scheduledDate: "", department: "",
        doctorId: "", address: "", remarks: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.label}>Book Appointment</span>
          <h2 style={styles.title}>Schedule Your Visit</h2>
          <p style={styles.subtitle}>
            Fill in the form below to book an appointment with one of our specialists.
          </p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.lbl}>Full Name</label>
              <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Your full name" style={styles.inp} required />
            </div>
            <div style={styles.group}>
              <label style={styles.lbl}>Email</label>
              <input name="patientEmail" type="email" value={form.patientEmail} onChange={handleChange} placeholder="you@email.com" style={styles.inp} required />
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.lbl}>Phone</label>
              <input name="patientPhone" value={form.patientPhone} onChange={handleChange} placeholder="03001234567" style={styles.inp} required />
            </div>
            <div style={styles.group}>
              <label style={styles.lbl}>CNIC</label>
              <input name="patientCnic" value={form.patientCnic} onChange={handleChange} placeholder="3520212345678" style={styles.inp} required />
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.lbl}>Date of Birth</label>
              <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} style={styles.inp} required />
            </div>
            <div style={styles.group}>
              <label style={styles.lbl}>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} style={styles.sel} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.lbl}>Appointment Date</label>
              <input name="scheduledDate" type="date" value={form.scheduledDate} onChange={handleChange} style={styles.inp} required />
            </div>
            <div style={styles.group}>
              <label style={styles.lbl}>Department</label>
              <select name="department" value={form.department} onChange={handleChange} style={styles.sel} required>
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.lbl}>Doctor</label>
              <select name="doctorId" value={form.doctorId} onChange={handleChange} style={styles.sel} required disabled={!form.department}>
                <option value="">{form.department ? "Select doctor" : "Select department first"}</option>
                {filteredDocs.map((d) => (
                  <option key={d._id} value={d._id}>{d.fullName}</option>
                ))}
              </select>
            </div>
            <div style={styles.group}>
              <label style={styles.lbl}>Address</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Your address" style={styles.inp} required />
            </div>
          </div>
          <div style={styles.group}>
            <label style={styles.lbl}>Remarks (Optional)</label>
            <textarea name="remarks" value={form.remarks} onChange={handleChange} placeholder="Any additional information..." rows={3} style={{ ...styles.inp, resize: "vertical" }} />
          </div>
          <button type="submit" disabled={submitting} style={styles.btn}>
            <RiCalendarLine /> {submitting ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: "120px 0 80px", background: "#f8fafc" },
  container: { maxWidth: 800, margin: "0 auto", padding: "0 24px" },
  header: { textAlign: "center", marginBottom: 48 },
  label: {
    display: "inline-block", fontSize: "0.75rem", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.12em", color: "#2563eb",
    background: "#eff6ff", border: "1px solid #bfdbfe",
    padding: "5px 14px", borderRadius: 999, marginBottom: 14,
  },
  title: {
    fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.01em",
    color: "#1e293b", marginBottom: 12,
  },
  subtitle: { fontSize: "0.95rem", color: "#64748b", lineHeight: 1.7 },
  form: {
    background: "#ffffff", border: "1px solid #e2e8f0",
    borderRadius: 16, padding: 36, boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
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
    color: "#1e293b", fontSize: "0.95rem", fontFamily: "Inter, sans-serif", outline: "none",
    cursor: "pointer",
  },
  btn: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 28px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
    color: "white", background: "#2563eb", border: "none", cursor: "pointer",
    width: "100%", justifyContent: "center", fontFamily: "Inter, sans-serif",
  },
};

export default BookingForm;
