import React from "react";
import { Link } from "react-router-dom";
import { RiHeartPulseFill, RiArrowRightLine, RiShieldCheckLine, RiStethoscopeLine, RiTimeLine } from "react-icons/ri";

const HeroBanner = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.badge}>
            <RiHeartPulseFill style={{ color: "#2563eb" }} />
            <span>Trusted Healthcare Provider</span>
          </div>
          <h1 style={styles.heading}>
            Your Health, Our <span style={styles.headingAccent}>Priority</span>
          </h1>
          <p style={styles.subtitle}>
            Experience world-class medical care with MediCare Pro. Book appointments
            with top specialists, access your medical records, and manage your
            healthcare journey — all in one place.
          </p>
          <div style={styles.actions}>
            <Link to="/book-appointment" style={styles.btnPrimary}>
              Book Appointment <RiArrowRightLine />
            </Link>
            <Link to="/about" style={styles.btnOutline}>
              Learn More
            </Link>
          </div>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <RiStethoscopeLine style={styles.statIcon} />
              <div>
                <strong style={styles.statNum}>50+</strong>
                <span style={styles.statLabel}>Expert Doctors</span>
              </div>
            </div>
            <div style={styles.stat}>
              <RiShieldCheckLine style={styles.statIcon} />
              <div>
                <strong style={styles.statNum}>10k+</strong>
                <span style={styles.statLabel}>Patients Served</span>
              </div>
            </div>
            <div style={styles.stat}>
              <RiTimeLine style={styles.statIcon} />
              <div>
                <strong style={styles.statNum}>24/7</strong>
                <span style={styles.statLabel}>Availability</span>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.visual}>
          <div style={styles.visualCard}>
            <RiHeartPulseFill style={{ fontSize: 70, color: "#2563eb", opacity: 0.3 }} />
            <p style={{ color: "#94a3b8", marginTop: 14, textAlign: "center", fontSize: "0.9rem" }}>
              Advanced Healthcare Solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    paddingTop: 68,
    background: "#f8fafc",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    alignItems: "center",
    gap: 60,
    width: "100%",
  },
  content: {},
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    padding: "6px 14px",
    borderRadius: 999,
    marginBottom: 20,
  },
  heading: {
    fontSize: "3rem",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: "#1e293b",
    marginBottom: 18,
  },
  headingAccent: {
    color: "#2563eb",
  },
  subtitle: {
    fontSize: "1.05rem",
    color: "#64748b",
    lineHeight: 1.7,
    maxWidth: 500,
    marginBottom: 28,
  },
  actions: {
    display: "flex",
    gap: 12,
    marginBottom: 40,
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    borderRadius: 8,
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "white",
    background: "#2563eb",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    borderRadius: 8,
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#1e293b",
    background: "white",
    border: "1px solid #e2e8f0",
    textDecoration: "none",
  },
  stats: {
    display: "flex",
    gap: 36,
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  statIcon: {
    fontSize: 22,
    color: "#2563eb",
  },
  statNum: {
    display: "block",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#1e293b",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#94a3b8",
  },
  visual: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  visualCard: {
    width: 340,
    height: 380,
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },
};

export default HeroBanner;
