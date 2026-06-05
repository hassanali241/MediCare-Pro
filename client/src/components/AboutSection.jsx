import React from "react";
import { RiAwardLine } from "react-icons/ri";

const AboutSection = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.imageCol}>
          <div style={styles.imageCard}>
            <div style={styles.imagePlaceholder}>
              <RiAwardLine style={{ fontSize: 50, color: "#2563eb", opacity: 0.4 }} />
              <p style={{ color: "#94a3b8", marginTop: 10 }}>Since 2010</p>
            </div>
            <div style={styles.floatingBadge}>
              <strong style={{ fontSize: "1.3rem", color: "#1e293b" }}>15+</strong>
              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Years of Excellence</span>
            </div>
          </div>
        </div>
        <div style={styles.textCol}>
          <span style={styles.label}>About Us</span>
          <h2 style={styles.title}>Committed to Delivering Exceptional Healthcare</h2>
          <p style={styles.desc}>
            At MediCare Pro, we believe that everyone deserves access to quality
            healthcare. Founded with a mission to bridge the gap between patients
            and medical professionals, we have grown into a trusted healthcare
            institution serving thousands of patients annually.
          </p>
          <p style={styles.desc}>
            Our team of experienced doctors across 9 specialized departments work
            tirelessly to provide accurate diagnoses, effective treatments, and
            compassionate care. From routine check-ups to complex procedures, we
            are equipped to handle all your healthcare needs.
          </p>
          <div style={styles.features}>
            {[
              "Board-certified medical professionals",
              "State-of-the-art diagnostic equipment",
              "Patient-centered approach to care",
              "Convenient online appointment booking",
            ].map((item, i) => (
              <div key={i} style={styles.featureItem}>
                <div style={styles.checkmark}>✓</div>
                <span style={{ color: "#475569" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: "80px 0", background: "#ffffff" },
  container: {
    maxWidth: 1200, margin: "0 auto", padding: "0 24px",
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
  },
  imageCol: { position: "relative" },
  imageCard: {
    background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14,
    height: 380, display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative",
  },
  imagePlaceholder: { display: "flex", flexDirection: "column", alignItems: "center" },
  floatingBadge: {
    position: "absolute", bottom: 20, right: 20,
    background: "white", border: "1px solid #e2e8f0", borderRadius: 10,
    padding: "12px 18px", display: "flex", flexDirection: "column", alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  textCol: {},
  label: {
    display: "inline-block", fontSize: "0.75rem", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.12em", color: "#2563eb",
    background: "#eff6ff", border: "1px solid #bfdbfe",
    padding: "5px 14px", borderRadius: 999, marginBottom: 14,
  },
  title: {
    fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.01em",
    lineHeight: 1.25, marginBottom: 16, color: "#1e293b",
  },
  desc: { fontSize: "0.95rem", color: "#64748b", lineHeight: 1.7, marginBottom: 14 },
  features: { marginTop: 20, display: "flex", flexDirection: "column", gap: 12 },
  featureItem: { display: "flex", alignItems: "center", gap: 10 },
  checkmark: {
    width: 22, height: 22, borderRadius: 6, background: "#f0fdf4",
    color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, border: "1px solid #bbf7d0",
  },
};

export default AboutSection;
