import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p 4 overflow-hidden">
      <Routes>
        <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
