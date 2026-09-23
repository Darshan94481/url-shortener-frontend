import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/contextApi";

export default function PrivateRoute({ children, publicPage }) {
  const { token } = useStoreContext();

  if (publicPage) {
    return token ? <Navigate to="/dashboard" replace /> : children;
  }

  return !token ? <Navigate to="/login" replace /> : children;
}
