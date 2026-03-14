import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";

function App() {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p 4 overflow-hidden">
      <Routes>
        <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/authorization" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
