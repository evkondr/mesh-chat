import { MessageCircleIcon } from "lucide-react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useState } from "react";
import SignUpForm from "../components/form/SignUpForm";
import LoginForm from "../components/form/LoginForm";

const AuthPage = () => {
  
  const [isLoginPage, setIsLoginPage] = useState<boolean>(false);
  
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer withAnimation>
          <div className="w-full flex flex-col md:flex-row">
            {/* LEFT COL */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mn-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    {!isLoginPage ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>
                {!isLoginPage ? (
                  <LoginForm />
                ) : (
                  <SignUpForm />
                )}
                <div className="mt-6 text-center">
                  <div className="auth-link" onClick={() => setIsLoginPage(!isLoginPage)}>
                    {!isLoginPage ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}.
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default AuthPage;