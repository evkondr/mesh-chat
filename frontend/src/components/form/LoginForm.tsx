import { useForm, type SubmitHandler } from "react-hook-form";
import useAuthStore from "../../store/useAuthStore";
import type { SignUpDto } from "../../types/dto";
import ChatInput from "./ChatInput";
import { LoaderIcon, MailIcon } from "lucide-react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm<SignUpDto>();
  const { isLoggingIn, login } = useAuthStore();
  const onSubmit: SubmitHandler<SignUpDto> = (data) => {
    login(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ChatInput
        name="email"
        register={register}
        icon={<MailIcon className="auth-input-icon"/>}
        labelText="Email"
      />
      <ChatInput
        name="fullName"
        register={register}
        icon={<MailIcon className="auth-input-icon"/>}
        labelText="Full name"
      />
      <button className="auth-btn" type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? (
          <LoaderIcon className="w-full h-5 animate-spin text-center" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;