
import React, { useEffect } from "react";
import "../App.css";
import ProgramsAge from "../components/programsAge/ProgramsAge";
import Footer from "../components/footer/Footer";
export default function ProgramsAgePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
     
      <ProgramsAge />
      <Footer />
    </>
  );
}
