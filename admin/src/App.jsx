import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminContext } from "./context/AdminContext";
import adminApi from "./services/adminApi";
import NavPanel from "./components/NavPanel";
import OverviewPanel from "./components/OverviewPanel";
import SignInForm from "./components/SignInForm";
import DoctorForm from "./components/DoctorForm";
import AdminForm from "./components/AdminForm";
import StaffList from "./components/StaffList";
import InboxList from "./components/InboxList";

const App = () => {
  const { isLoggedIn, loginAdmin, logoutAdmin, setLoaded } = useAdminContext();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await adminApi.get("/auth/profile");
        if (data.account.role === "admin") {
          loginAdmin(data.account);
        } else {
          logoutAdmin();
        }
      } catch {
        logoutAdmin();
      }
    };
    checkSession();
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <NavPanel />
          <main style={{ flex: 1, padding: "32px", marginLeft: 260, background: "#f8fafc" }}>
            <Routes>
              <Route path="/" element={<OverviewPanel />} />
              <Route path="/add-doctor" element={<DoctorForm />} />
              <Route path="/add-admin" element={<AdminForm />} />
              <Route path="/manage-doctors" element={<StaffList />} />
              <Route path="/inbox" element={<InboxList />} />
              <Route path="*" element={<OverviewPanel />} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="*" element={<SignInForm />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
