import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AboutUsPage from './pages/AboutUSPage';
import AddChildPage from './pages/AddChildPage';
import ProtectedRoute from './pages/CheckLogin';
import ContactUsPage from './pages/Contactuspage';
import DailySchedulePage from './pages/DailySchedulePage';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/MainPage';
import MechanicRepairProcess from './pages/MechanicPage';
import MeetTeachersPage from './pages/MeetTeachersPage';
import ProgramsAge from './pages/ProgramsAge';
import RemoteStarter from './pages/RemoteStarterPage';
import RootLayout from './pages/Root';
import SignIn from './pages/SignIn';
import TiresAndWheelPage from './pages/TiresAndWheelPage';
import { checkAuth } from './store/authSlice'; // Import your checkAuth thunk

import { Spin } from 'antd';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const loading = false;
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="wait-container">
        <div className="wait-box">
          <h1 className="wait-title">Please wait...</h1>
          <p className="wait-text">
            The site will be available in{' '}
            <span className="wait-highlight">30</span> seconds.
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
        {/* <Route
          path="signup"
          element={isAuthenticated ? <RegistrationPage /> : <LoginPage />}
        /> */}
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
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard/:id" element={<Dashboard />}>
            <Route path="addchild" element={<AddChildPage />} />
            <Route
              path="child/:childId"
              element={<div>Child View Placeholder</div>}
            />
          </Route>
        </Route>
        {/* Catch-all route */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
