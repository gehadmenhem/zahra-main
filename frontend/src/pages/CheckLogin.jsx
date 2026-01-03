import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckLogin = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default CheckLogin;
