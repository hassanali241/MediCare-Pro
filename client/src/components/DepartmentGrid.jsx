import React from "react";
import {
  RiMentalHealthLine,
  RiHeartPulseLine,
  RiSurgicalMaskLine,
  RiBrainLine,
  RiMicroscopeLine,
  RiRunLine,
  RiEyeLine,
  RiHandHeartLine,
  RiVolumeMuteLine,
} from "react-icons/ri";

const departments = [
  { name: "Pediatrics", icon: RiHandHeartLine, desc: "Specialized care for infants, children, and adolescents" },
  { name: "Orthopedics", icon: RiMentalHealthLine, desc: "Treatment of musculoskeletal system issues" },
  { name: "Cardiology", icon: RiHeartPulseLine, desc: "Heart and cardiovascular system care" },
  { name: "Neurology", icon: RiBrainLine, desc: "Disorders of the nervous system and brain" },
  { name: "Oncology", icon: RiMicroscopeLine, desc: "Comprehensive cancer care and treatment" },
  { name: "Radiology", icon: RiEyeLine, desc: "Medical imaging and diagnostic procedures" },
  { name: "Physical Therapy", icon: RiRunLine, desc: "Rehabilitation and physical recovery programs" },
  { name: "Dermatology", icon: RiSurgicalMaskLine, desc: "Skin, hair and nail treatment" },
  { name: "ENT", icon: RiVolumeMuteLine, desc: "Ear, nose and throat specialized care" },
];

const DepartmentGrid = () => {
  return (
    <section id="departments" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.label}>Departments</span>
          <h2 style={styles.title}>Our Medical Specialties</h2>
          <p style={styles.subtitle}>
            Explore our comprehensive range of specialized medical departments
            equipped with modern technology and expert healthcare professionals.
          </p>
        </div>

        <div style={styles.grid}>
          {departments.map((dept) => (
            <div key={dept.name} style={styles.card}>
              <div style={styles.iconWrap}>
                <dept.icon style={styles.icon} />
              </div>
              <h3 style={styles.deptName}>{dept.name}</h3>
              <p style={styles.deptDesc}>{dept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: "80px 0", background: "#f8fafc" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  header: { textAlign: "center", marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" },
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#ffffff", border: "1px solid #e2e8f0",
    borderRadius: 12, padding: 32, transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  iconWrap: {
    width: 54, height: 54, borderRadius: 12, background: "#eff6ff",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 20, border: "1px solid #bfdbfe",
  },
  icon: { fontSize: 28, color: "#2563eb" },
  deptName: { fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: 8 },
  deptDesc: { fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6 },
};

export default DepartmentGrid;
