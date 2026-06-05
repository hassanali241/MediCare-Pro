import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { RiSendPlaneFill, RiMapPinLine, RiPhoneLine, RiMailSendLine } from "react-icons/ri";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/inquiries", form);
      toast.success(data.message);
      setForm({ senderName: "", senderEmail: "", senderPhone: "", subject: "", body: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.infoCol}>
            <span style={styles.label}>Contact Us</span>
            <h2 style={styles.title}>Get In Touch With Our Team</h2>
            <p style={styles.desc}>
              Have questions about our services or need help with booking?
              Reach out to us and our support team will get back to you shortly.
            </p>

            <div style={styles.contactDetails}>
              <div style={styles.detailItem}>
                <div style={styles.detailIcon}><RiMapPinLine /></div>
                <div>
                  <h4 style={styles.detailTitle}>Location</h4>
                  <p style={styles.detailText}>123 Health Avenue, Medical District, NY 10001</p>
                </div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailIcon}><RiPhoneLine /></div>
                <div>
                  <h4 style={styles.detailTitle}>Phone</h4>
                  <p style={styles.detailText}>+1 (555) 123-4567</p>
                </div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailIcon}><RiMailSendLine /></div>
                <div>
                  <h4 style={styles.detailTitle}>Email</h4>
                  <p style={styles.detailText}>support@medicarepro.com</p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.formCol}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.row}>
                <div style={styles.group}>
                  <label style={styles.lbl}>Full Name</label>
                  <input name="senderName" value={form.senderName} onChange={handleChange} placeholder="Your name" style={styles.inp} required />
                </div>
                <div style={styles.group}>
                  <label style={styles.lbl}>Phone</label>
                  <input name="senderPhone" value={form.senderPhone} onChange={handleChange} placeholder="Your phone" style={styles.inp} required />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.group}>
                  <label style={styles.lbl}>Email</label>
                  <input name="senderEmail" type="email" value={form.senderEmail} onChange={handleChange} placeholder="you@email.com" style={styles.inp} required />
                </div>
                <div style={styles.group}>
                  <label style={styles.lbl}>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" style={styles.inp} required />
                </div>
              </div>
              <div style={styles.group}>
                <label style={styles.lbl}>Message</label>
                <textarea name="body" value={form.body} onChange={handleChange} placeholder="Write your message here..." rows={4} style={{ ...styles.inp, resize: "vertical" }} required />
              </div>
              <button type="submit" disabled={loading} style={styles.btn}>
                <RiSendPlaneFill /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: "80px 0", background: "#ffffff" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" },
  infoCol: {},
  label: {
    display: "inline-block", fontSize: "0.75rem", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.12em", color: "#2563eb",
    background: "#eff6ff", border: "1px solid #bfdbfe",
    padding: "5px 14px", borderRadius: 999, marginBottom: 14,
  },
  title: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#1e293b", marginBottom: 16 },
  desc: { fontSize: "0.95rem", color: "#64748b", lineHeight: 1.7, marginBottom: 32 },
  contactDetails: { display: "flex", flexDirection: "column", gap: 24 },
  detailItem: { display: "flex", alignItems: "flex-start", gap: 16 },
  detailIcon: {
    width: 44, height: 44, borderRadius: 10, background: "#eff6ff",
    color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, flexShrink: 0, border: "1px solid #bfdbfe",
  },
  detailTitle: { fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", marginBottom: 4 },
  detailText: { fontSize: "0.9rem", color: "#64748b" },
  formCol: {},
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
  btn: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 28px", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600,
    color: "white", background: "#2563eb", border: "none", cursor: "pointer",
    width: "100%", justifyContent: "center", fontFamily: "Inter, sans-serif",
  },
};

export default ContactForm;
