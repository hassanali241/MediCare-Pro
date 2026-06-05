import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminApi from "../services/adminApi";
import { RiDeleteBinLine, RiStethoscopeLine } from "react-icons/ri";

const StaffList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await adminApi.get("/staff/doctors");
      setDoctors(data.doctors);
    } catch {
      console.error("Failed to load doctors");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor?")) return;
    try {
      const { data } = await adminApi.delete(`/staff/doctor/${id}`);
      toast.success(data.message);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove doctor");
    }
  };

  return (
    <div>
      <h1 style={s.heading}>Registered Doctors</h1>
      <p style={s.subheading}>{doctors.length} doctors in the system</p>
      <div style={s.grid}>
        {doctors.length === 0 ? (
          <p style={{ color: "#64748b" }}>No doctors registered yet.</p>
        ) : (
          doctors.map((doc) => (
            <div key={doc._id} style={s.card}>
              <div style={s.avatar}>
                {doc.profileImage?.imageUrl ? (
                  <img src={doc.profileImage.imageUrl} alt={doc.fullName} style={s.avatarImg} />
                ) : (
                  <RiStethoscopeLine style={{ fontSize: 24, color: "#2563eb" }} />
                )}
              </div>
              <div style={s.info}>
                <h3 style={s.name}>{doc.fullName}</h3>
                <span style={s.specialty}>{doc.specialty}</span>
                <p style={s.email}>{doc.email}</p>
                <p style={s.phone}>{doc.contactNumber}</p>
              </div>
              <button onClick={() => handleDelete(doc._id)} style={s.deleteBtn} title="Remove Doctor">
                <RiDeleteBinLine />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const s = {
  heading: { fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", marginBottom: 4 },
  subheading: { fontSize: "0.9rem", color: "#64748b", marginBottom: 28 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 },
  card: {
    background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12,
    padding: 24, display: "flex", alignItems: "center", gap: 16, position: "relative",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  avatar: {
    width: 56, height: 56, borderRadius: 12, background: "#eff6ff",
    border: "1px solid #bfdbfe", display: "flex", alignItems: "center",
    justifyContent: "center", overflow: "hidden", flexShrink: 0,
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  info: { flex: 1 },
  name: { fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: 2 },
  specialty: {
    display: "inline-block", fontSize: "0.7rem", fontWeight: 600,
    color: "#2563eb", background: "#eff6ff",
    border: "1px solid #bfdbfe", padding: "2px 10px",
    borderRadius: 999, marginBottom: 6,
  },
  email: { fontSize: "0.85rem", color: "#64748b" },
  phone: { fontSize: "0.85rem", color: "#64748b" },
  deleteBtn: {
    position: "absolute", top: 16, right: 16,
    width: 32, height: 32, borderRadius: 8,
    background: "#fef2f2", border: "1px solid #fee2e2",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#dc2626", cursor: "pointer", fontSize: 16, transition: "all 0.2s",
  },
};

export default StaffList;
