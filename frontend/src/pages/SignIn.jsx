import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import "../components/registrationForm/registrationForm.css";
import SignIn from "../components/signin/SignIn";
export default function PreApprove() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
        <SignIn />
      <Footer />
    </>
  );
}
