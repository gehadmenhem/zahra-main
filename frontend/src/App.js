import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";  // Import your checkAuth thunk
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from "./pages/MainPage";
import Inventory from "./pages/InventoryPage";
import AboutUsPage from "./pages/AboutUSPage";
import ContactUsPage from "./pages/Contactuspage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DailySchedulePage from "./pages/DailySchedulePage";
import ProgramsAge from "./pages/ProgramsAge";
import RootLayout from "./pages/Root";
import TiresAndWheelPage from "./pages/TiresAndWheelPage";
import ErrorPage from "./pages/ErrorPage";
import MechanicRepairProcess from "./pages/MechanicPage";
import RemoteStarter from "./pages/RemoteStarterPage";
import MeetTeachersPage from "./pages/MeetTeachersPage";
import SignIn from "./pages/SignIn";
import { Spin } from 'antd';
import "./App.css"
// const App = () => {
//   const dispatch = useDispatch();

//   // Access authentication status and loading state from Redux
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   // Effect to check authentication on load
//   useEffect(() => {
//     // Dispatch the checkAuth action to verify if the user is authenticated
//     dispatch(checkAuth());
//   }, [dispatch]);

//   // If loading is true, don't render the main components yet
//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator while authentication is being checked
//   }

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootLayout />,
//       errorElement: <ErrorPage />,
//       children: [
//         { index: true, element: <Home /> },
//         {
//           path: "signup",
//           // Only allow access to signup if the user is authenticated
//           element: isAuthenticated ? <RegistrationPage /> : <Navigate to="/login" />,
//         },
//         {
//           path: "inventory",
//           element: <Inventory />,
//         },
//         {
//           path: "aboutus",
//           element: <AboutUsPage />,
//         },
//         {
//           path: "contactus",
//           element: <ContactUsPage />,
//         },
//         {
//           path: "autobody",
//           element: <Autobody />,
//         },
//         {
//           path: "mechanic",
//           element: <MechanicRepairProcess />,
//         },
//         {
//           path: "login",
//           element: <LoginPage />,
//         },
//          {
//           path: "tires",
//           element: <TiresAndWheelPage />,
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;
// import React, { useEffect } from 'react';
// import { Routes, Route, Link, Navigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { checkAuth } from './store/authSlice';

// // Page components
// import Home from './pages/MainPage';
// import Inventory from './pages/InventoryPage';
// import AboutUsPage from './pages/AboutUsPage';
// import ContactUsPage from './pages/ContactUsPage'; // fixed casing here
// import RegistrationPage from './pages/RegistrationPage';
// import LoginPage from './pages/LoginPage';
// import Autobody from './pages/AutobodyPage';
// import TiresAndWheelPage from './pages/TiresAndWheelPage';
// import MechanicRepairProcess from './pages/MechanicPage';
// import ErrorPage from './pages/ErrorPage';

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const loading=false
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 if (loading) {
    return (
      <div className="wait-container">
        <div className="wait-box">
          <h1 className="wait-title">Please wait...</h1>
          <p className="wait-text">
            The site will be available in <span className="wait-highlight">30</span> seconds.
          </p>
          <Spin tip="Loading..." size="large" />;
        </div>
      </div>
    );
}

return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Nested routes will render inside RootLayout's <Outlet /> */}
        <Route index element={<Home />} />
        <Route
          path="signup"
          element={isAuthenticated ? <RegistrationPage /> : <LoginPage />}
        />
        {/* <Route path="inventory" element={<Inventory />} /> */}
        <Route path="aboutus" element={<AboutUsPage />} />
        <Route path="contactus" element={<ContactUsPage />} />
        <Route path="dailyschedule" element={<DailySchedulePage />} />
        <Route path="programs" element={<ProgramsAge />} />
        <Route path="meetteacher" element={<MeetTeachersPage />} />
        <Route path="remotestarter" element={<RemoteStarter />} />
        <Route path="mechanic" element={<MechanicRepairProcess />} />
        <Route path="login" element={<LoginPage />} />
      <Route path="tires" element={<TiresAndWheelPage />} />
       <Route path="signin" element={<SignIn />} />
        {/* Catch-all route */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
