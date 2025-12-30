
import "../App.css";
import DailySchedule from "../components/dailyschedule/DailySchedule";
import Footer from "../components/footer/Footer";
import React, { useEffect } from "react";
export default function DailySchedulePage() {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
     
      <DailySchedule />
      <Footer />
    </>
  );
}
