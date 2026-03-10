import { useEffect, type ReactNode } from "react";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router";


type Props = {
  children: ReactNode
}
const ProtectedRoute = ({ children }:Props) => {
  const { isCheckingAuth, checkAuth, authUser} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if(isCheckingAuth) {
    return <p>loading</p>;
  }
  return (
    authUser ? children : (<Navigate to="/login" />)
  );
};

export default ProtectedRoute;