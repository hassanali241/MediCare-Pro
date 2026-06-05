import React, { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import { RiMailLine } from "react-icons/ri";

const InboxList = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await adminApi.get("/inquiries");
        setInquiries(data.inquiries);
      } catch {
        console.error("Failed to load inquiries");
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 style={s.heading}>Inbox</h1>
      <p style={s.subheading}>{inquiries.length} messages received</p>
      <div style={s.list}>
        {inquiries.length === 0 ? (
          <p style={{ color: "#64748b", padding: 20 }}>No messages yet.</p>
        ) : (
          inquiries.map((msg) => (
            <div key={msg._id} style={s.card}>
              <div style={s.cardHeader}>
                <div style={s.avatar}>
                  <RiMailLine style={{ fontSize: 18, color: "#2563eb" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={s.sender}>{msg.senderName}</h3>
                  <p style={s.email}>{msg.senderEmail} • {msg.senderPhone}</p>
                </div>
                <span style={s.date}>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 style={s.subject}>{msg.subject}</h4>
              <p style={s.body}>{msg.body}</p>
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
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    background: "#ffffff", border: "1px solid #e2e8f0",
    borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
  avatar: {
    width: 40, height: 40, borderRadius: 10, background: "#eff6ff",
    border: "1px solid #bfdbfe", display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  },
  sender: { fontSize: "0.95rem", fontWeight: 700, color: "#1e293b" },
  email: { fontSize: "0.8rem", color: "#64748b" },
  date: { fontSize: "0.75rem", color: "#94a3b8" },
  subject: { fontSize: "0.95rem", fontWeight: 600, color: "#1e293b", marginBottom: 8 },
  body: { fontSize: "0.9rem", color: "#475569", lineHeight: 1.6 },
};

export default InboxList;
