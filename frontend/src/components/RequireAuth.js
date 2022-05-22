import { Navigate } from "react-router-dom";
const RequireAuth = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default RequireAuth;
