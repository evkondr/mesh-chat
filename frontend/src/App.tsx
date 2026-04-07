import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p 4 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/authorization" element={!authUser ? (<AuthPage />) : (<Navigate to="/" />)} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
