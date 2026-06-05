import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./context/AppContext";
import api from "./services/api";
import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  const { isLoggedIn, setUser, clearUser } = useAppContext();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data.account);
      } catch {
        clearUser();
      }
    };
    loadProfile();
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book-appointment" element={<BookingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
      <SiteFooter />
      <ToastContainer position="top-center" theme="dark" />
    </BrowserRouter>
  );
};

export default App;
