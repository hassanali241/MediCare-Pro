import React from "react";
import AboutSection from "../components/AboutSection";
import DepartmentGrid from "../components/DepartmentGrid";

const AboutPage = () => {
  return (
    <main style={{ paddingTop: 72 }}>
      <AboutSection />
      <DepartmentGrid />
    </main>
  );
};

export default AboutPage;
