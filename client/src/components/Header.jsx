import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";
import { toast } from "react-toastify";
import { RiMenuLine, RiCloseLine, RiHeartPulseFill } from "react-icons/ri";

const Header = () => {
  const { isLoggedIn, clearUser } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await api.get("/auth/sign-out");
      clearUser();
      toast.success("Signed out successfully");
      navigate("/");
    } catch {
      toast.error("Sign out failed");
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Departments", path: "/#departments" },
    { label: "Book Appointment", path: "/book-appointment" },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <RiHeartPulseFill style={styles.logoIcon} />
          <span style={styles.logoText}>MediCare<span style={styles.logoAccent}>Pro</span></span>
        </Link>

        <nav style={{ ...styles.nav, ...(menuOpen ? styles.navOpen : {}) }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div style={styles.authGroup}>
            {isLoggedIn ? (
              <button onClick={handleSignOut} style={styles.btnOutline}>
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/sign-in" style={styles.btnOutline} onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/sign-up" style={styles.btnPrimary} onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        <button
          style={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #e2e8f0",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 68,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  },
  logoIcon: {
    fontSize: 26,
    color: "#2563eb",
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#1e293b",
  },
  logoAccent: {
    color: "#2563eb",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 28,
  },
  navOpen: {
    position: "fixed",
    top: 68,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255,255,255,0.98)",
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
    zIndex: 999,
  },
  navLink: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#64748b",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  authGroup: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  btnOutline: {
    padding: "8px 18px",
    borderRadius: 8,
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#1e293b",
    background: "transparent",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  btnPrimary: {
    padding: "8px 18px",
    borderRadius: 8,
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "white",
    background: "#2563eb",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  menuBtn: {
    display: "none",
    background: "none",
    border: "none",
    color: "#1e293b",
    cursor: "pointer",
  },
};

export default Header;
