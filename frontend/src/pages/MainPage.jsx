<<<<<<< HEAD
import React from "react";
import "../App.css";
import MiddleSection from "../components/MiddleSection/MiddleSection";
import Card from "../components/card/Card";
import Footer from "../components/footer/Footer";
export default function Home() {
=======
import React, { useEffect,useState } from "react";
import "../App.css";
import MiddleSection from "../components/MiddleSection/MiddleSection";
import Card from "../components/card/Card";
import ReviewCarousel from "../components/reviews/ReviewCarousel";
import Footer from "../components/footer/Footer";
import api from "../api/apiCalls";
import { notification } from "antd";
export default function Home() {
  const [reviews, setReviews] = useState([]);
  // const [loading, setLoading] = useState(true); // optional for loading state
  // const [error, setError] = useState(null); 
     useEffect(() => {
       window.scrollTo(0, 0);
       async function fetchReviews() {
      try {
            const response = await api.getAllReviews();
            setReviews(response);
        
          } catch (error) {
            notification.error({
              message: "Error",
              description: error?.message,
              duration: 5,
            });
          }
    }

    fetchReviews();
  }, []);
>>>>>>> ebae283fb162f9c5ba9e6261a3a63516457ae9f2
  return (
    <>
      <MiddleSection />
      <Card />
<<<<<<< HEAD
=======
      <ReviewCarousel reviews={reviews}/>
>>>>>>> ebae283fb162f9c5ba9e6261a3a63516457ae9f2
      <Footer />
    </>
  );
}
