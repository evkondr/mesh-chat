import { UserIcon, MailIcon, LockIcon, LoaderIcon } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { SignUpDto } from '../../types/dto';
import ChatInput from './ChatInput';
import useAuthStore from '../../store/useAuthStore';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm<SignUpDto>();
  const { isSigningUp, signup } = useAuthStore();
  const onSubmit: SubmitHandler<SignUpDto> = (data) => {
    signup(data);
  };
  return (
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
  );
};

export default SignUpForm;