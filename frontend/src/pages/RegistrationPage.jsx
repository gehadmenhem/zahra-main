import RegistrationForm from "../components/registrationForm/RegistrationForm";
import Footer from "../components/footer/Footer";
import "../components/registrationForm/registrationForm.css";
export default function RegistrationPage() {
  return (
    <>
      <div className="center-container">
        <RegistrationForm />
      </div>

      <Footer />
    </>
  );
}
