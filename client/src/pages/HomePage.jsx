import React from "react";
import HeroBanner from "../components/HeroBanner";
import AboutSection from "../components/AboutSection";
import DepartmentGrid from "../components/DepartmentGrid";
import ContactForm from "../components/ContactForm";

const HomePage = () => {
  return (
    <main>
      <HeroBanner />
      <AboutSection />
      <DepartmentGrid />
      <ContactForm />
    </main>
  );
};

export default HomePage;
