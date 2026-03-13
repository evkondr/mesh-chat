import { LoaderIcon, LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import ChatInput from "../components/form/ChatInput";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignUpDto } from "../types/dto";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
  } = useForm<SignUpDto>();
  const onSubmit: SubmitHandler<SignUpDto> = (data) => console.log(data);
  const { isSigningUp } = useAuthStore();
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* LEFT COL */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mn-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                  Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <ChatInput
                    name="fullName"
                    register={register}
                    icon={<UserIcon className="auth-input-icon"/>}
                    labelText="Full name"
                  />
                  <ChatInput
                    name="email"
                    register={register}
                    icon={<MailIcon className="auth-input-icon"/>}
                    labelText="Email"
                  />
                  <ChatInput
                    name="password"
                    type="password"
                    register={register}
                    icon={<LockIcon className="auth-input-icon"/>}
                    labelText="Password"
                  />
                  <button type="submit" className="auth-btn" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <Link to='/login' className="auth-link">
                    Already have an account? Login.
                  </Link>
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

export default SignUpPage;