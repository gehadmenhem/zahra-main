
import "../App.css";
import React, { useEffect } from "react";
import MeetTeacher from "../components/meetOurTeachers/MeetTeachers";
import Footer from "../components/footer/Footer";
export default function MeetTeachersPage() {
   useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
     
      <MeetTeacher />
      <Footer />
    </>
  );
}
