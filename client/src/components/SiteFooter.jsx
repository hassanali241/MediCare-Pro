import React from "react";
import { Link } from "react-router-dom";
import { RiHeartPulseFill, RiTwitterXFill, RiFacebookCircleFill, RiInstagramLine, RiLinkedinBoxFill } from "react-icons/ri";

const SiteFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.top}>
          <div style={styles.brandCol}>
            <Link to="/" style={styles.logo}>
              <RiHeartPulseFill style={styles.logoIcon} />
              <span style={styles.logoText}>MediCare<span style={styles.logoAccent}>Pro</span></span>
            </Link>
            <p style={styles.brandDesc}>
              Delivering exceptional healthcare services with state-of-the-art
              technology and compassionate professionals.
            </p>
            <div style={styles.socials}>
              <a href="#" style={styles.socialLink}><RiTwitterXFill /></a>
              <a href="#" style={styles.socialLink}><RiFacebookCircleFill /></a>
              <a href="#" style={styles.socialLink}><RiInstagramLine /></a>
              <a href="#" style={styles.socialLink}><RiLinkedinBoxFill /></a>
            </div>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Quick Links</h4>
            <ul style={styles.linkList}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/about" style={styles.link}>About Us</Link></li>
              <li><Link to="/book-appointment" style={styles.link}>Book Appointment</Link></li>
              <li><Link to="/sign-in" style={styles.link}>Sign In</Link></li>
            </ul>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Departments</h4>
            <ul style={styles.linkList}>
              <li><span style={styles.link}>Cardiology</span></li>
              <li><span style={styles.link}>Neurology</span></li>
              <li><span style={styles.link}>Orthopedics</span></li>
              <li><span style={styles.link}>Pediatrics</span></li>
            </ul>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Legal</h4>
            <ul style={styles.linkList}>
              <li><span style={styles.link}>Privacy Policy</span></li>
              <li><span style={styles.link}>Terms of Service</span></li>
              <li><span style={styles.link}>Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} MediCare Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: { background: "#f8fafc", paddingTop: 80, borderTop: "1px solid #e2e8f0" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  top: {
    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 40, paddingBottom: 60, borderBottom: "1px solid #e2e8f0",
  },
  brandCol: { paddingRight: 40 },
  logo: { display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 16 },
  logoIcon: { fontSize: 26, color: "#2563eb" },
  logoText: { fontSize: "1.25rem", fontWeight: 700, color: "#1e293b" },
  logoAccent: { color: "#2563eb" },
  brandDesc: { fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, marginBottom: 24 },
  socials: { display: "flex", gap: 12 },
  socialLink: {
    width: 36, height: 36, borderRadius: 8, background: "#eff6ff",
    color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center",
    textDecoration: "none", transition: "all 0.2s", border: "1px solid #bfdbfe",
  },
  colTitle: { fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: 20 },
  linkList: { display: "flex", flexDirection: "column", gap: 12 },
  link: { fontSize: "0.9rem", color: "#64748b", textDecoration: "none", transition: "color 0.2s", cursor: "pointer" },
  bottom: { padding: "24px 0", textAlign: "center" },
  copyright: { fontSize: "0.85rem", color: "#94a3b8" },
};

export default SiteFooter;
