import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";
import adminApi from "../services/adminApi";
import { toast } from "react-toastify";
import {
  RiHeartPulseFill,
  RiDashboardLine,
  RiUserAddLine,
  RiShieldUserLine,
  RiStethoscopeLine,
  RiMailLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

const NavPanel = () => {
  const { isLoggedIn, logoutAdmin } = useAdminContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await adminApi.get("/auth/sign-out");
      logoutAdmin();
      toast.success("Signed out");
      navigate("/sign-in");
    } catch {
      toast.error("Sign out failed");
    }
  };

  if (!isLoggedIn) return null;

  const links = [
    { to: "/", icon: RiDashboardLine, label: "Overview" },
    { to: "/add-doctor", icon: RiUserAddLine, label: "Add Doctor" },
    { to: "/add-admin", icon: RiShieldUserLine, label: "Add Admin" },
    { to: "/manage-doctors", icon: RiStethoscopeLine, label: "Doctors" },
    { to: "/inbox", icon: RiMailLine, label: "Inbox" },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <RiHeartPulseFill style={{ fontSize: 24, color: "#2563eb" }} />
        <span style={styles.brandText}>MediCare<span style={{ color: "#1d4ed8" }}>Pro</span></span>
      </div>
      <p style={styles.roleTag}>Admin Panel</p>
      <nav style={styles.nav}>
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.navLink,
                ...(active ? styles.navActive : {}),
              }}
            >
              <link.icon style={{ fontSize: 18 }} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={handleSignOut} style={styles.logoutBtn}>
        <RiLogoutBoxLine style={{ fontSize: 18 }} />
        Sign Out
      </button>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: 260,
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  brandText: {
    fontSize: "1.2rem",
    fontWeight: 800,
    color: "#1e293b",
  },
  roleTag: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 32,
    paddingLeft: 34,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 8,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#64748b",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  navActive: {
    background: "#eff6ff",
    color: "#2563eb",
    fontWeight: 600,
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    borderRadius: 8,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#dc2626",
    background: "#fef2f2",
    border: "1px solid #fee2e2",
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    transition: "all 0.2s",
  },
};

export default NavPanel;
