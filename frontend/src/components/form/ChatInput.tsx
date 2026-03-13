import { type HTMLInputTypeAttribute, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  labelText: string
  icon?: ReactNode
  name: Path<T>
  register: UseFormRegister<T>
  type?:HTMLInputTypeAttribute
}
const ChatInput = <T extends FieldValues>({ labelText, icon, register, name, type="text"}:Props<T>) => {
  return (
    <div>
      <label className='auth-input-label'>{labelText}</label>
      <div className="relative">
        {icon}
        <input
          {...register(name)}
          type={type}
          className={cn('input', icon ? 'pl-10' :'')}
          placeholder={labelText}
        />
      </div>
    </div>
  );
};

export default ChatInput;