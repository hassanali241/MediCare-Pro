import React, { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import { RiCalendarCheckLine, RiUserHeartLine, RiStethoscopeLine, RiCheckboxCircleLine, RiTimeLine, RiCloseCircleLine } from "react-icons/ri";

const OverviewPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [bRes, dRes] = await Promise.all([
          adminApi.get("/bookings"),
          adminApi.get("/staff/doctors"),
        ]);
        setBookings(bRes.data.bookings);
        setDoctors(dRes.data.doctors);
      } catch {
        console.error("Failed to load dashboard data");
      }
    };
    load();
  }, []);

  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

  const stats = [
    { label: "Total Appointments", value: bookings.length, icon: RiCalendarCheckLine, color: "#2563eb" },
    { label: "Doctors", value: doctors.length, icon: RiStethoscopeLine, color: "#7c3aed" },
    { label: "Confirmed", value: confirmed, icon: RiCheckboxCircleLine, color: "#16a34a" },
    { label: "Pending", value: pending, icon: RiTimeLine, color: "#d97706" },
  ];

  return (
    <div>
      <h1 style={s.heading}>Dashboard Overview</h1>
      <p style={s.subheading}>Welcome back. Here's what's happening today.</p>

      <div style={s.statsGrid}>
        {stats.map((st, i) => (
          <div key={i} style={s.statCard}>
            <div style={{ ...s.statIcon, background: `${st.color}15`, color: st.color }}>
              <st.icon style={{ fontSize: 24 }} />
            </div>
            <div>
              <p style={s.statValue}>{st.value}</p>
              <p style={s.statLabel}>{st.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={s.tableTitle}>Recent Appointments</h2>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Patient</th>
              <th style={s.th}>Department</th>
              <th style={s.th}>Doctor</th>
              <th style={s.th}>Date</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#94a3b8" }}>No appointments found</td></tr>
            ) : (
              bookings.slice(0, 10).map((b) => (
                <tr key={b._id}>
                  <td style={s.td}>{b.patientName}</td>
                  <td style={s.td}>{b.department}</td>
                  <td style={s.td}>{b.assignedDoctor?.name}</td>
                  <td style={s.td}>{b.scheduledDate}</td>
                  <td style={s.td}>
                    <span style={{
                      ...s.badge,
                      background: b.status === "confirmed" ? "#f0fdf4" : b.status === "cancelled" ? "#fef2f2" : "#fffbeb",
                      color: b.status === "confirmed" ? "#16a34a" : b.status === "cancelled" ? "#dc2626" : "#d97706",
                      border: `1px solid ${b.status === "confirmed" ? "#bbf7d0" : b.status === "cancelled" ? "#fecaca" : "#fde68a"}`,
                    }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={s.td}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => updateStatus(b._id, "confirmed")} style={s.actionBtn} title="Confirm">
                        <RiCheckboxCircleLine style={{ color: "#16a34a" }} />
                      </button>
                      <button onClick={() => updateStatus(b._id, "cancelled")} style={s.actionBtn} title="Cancel">
                        <RiCloseCircleLine style={{ color: "#dc2626" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  async function updateStatus(id, status) {
    try {
      await adminApi.patch(`/bookings/${id}`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch {
      console.error("Failed to update status");
    }
  }
};

const s = {
  heading: { fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: 4 },
  subheading: { fontSize: "0.95rem", color: "#64748b", marginBottom: 32 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 },
  statCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0", borderRadius: 12,
    padding: 24, display: "flex", alignItems: "center", gap: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  statIcon: {
    width: 48, height: 48, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  statValue: { fontSize: "1.5rem", fontWeight: 800, color: "#1e293b" },
  statLabel: { fontSize: "0.8rem", color: "#64748b" },
  tableTitle: { fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", marginBottom: 16 },
  tableWrap: {
    background: "#ffffff",
    border: "1px solid #e2e8f0", borderRadius: 12,
    overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "14px 20px", textAlign: "left", fontSize: "0.75rem",
    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
    color: "#64748b", borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  td: {
    padding: "14px 20px", fontSize: "0.9rem", color: "#334155",
    borderBottom: "1px solid #f1f5f9",
  },
  badge: {
    display: "inline-block", padding: "4px 12px", borderRadius: 999,
    fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize",
  },
  actionBtn: {
    width: 32, height: 32, borderRadius: 6,
    background: "#f8fafc", border: "1px solid #e2e8f0",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: 16, transition: "background 0.2s",
  },
};

export default OverviewPanel;
