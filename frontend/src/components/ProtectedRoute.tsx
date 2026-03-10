import { type ReactNode } from "react";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router";
import Preloader from "./Preloader";


type Props = {
  children: ReactNode
}
const ProtectedRoute = ({ children }:Props) => {
  const { isCheckingAuth, authUser} = useAuthStore();
  if(isCheckingAuth) {
    return (<Preloader />);
  }
  return (
    authUser ? children : (<Navigate to="/login" />)
  );
};

export default ProtectedRoute;