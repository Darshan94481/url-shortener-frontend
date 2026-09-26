import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const TextField = ({
  label,
  id,
  type = 'text',
  errors,
  register,
  required,
  message,
  className = '',
  min,
  value,
  placeHolder,
  placeholder,
  startIcon: StartIcon,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;
  const hasError = Boolean(errors?.[id]);
  const placeholderText = placeholder || placeHolder || '';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {StartIcon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
            <StartIcon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id}
          type={inputType}
          placeholder={placeholderText}
          className={`w-full text-sm text-slate-900 bg-white border rounded-xl py-2.5 transition-all duration-200 outline-none
            ${StartIcon ? 'pl-10' : 'pl-3.5'}
            ${isPasswordField ? 'pr-11' : 'pr-3.5'}
            ${
              hasError
                ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm'
            }
          `}
          {...register(id, {
            required: required ? message : false,
            ...(min && { minLength: { value: min, message: `Minimum ${min} characters required` } }),
          })}
          {...rest}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-2.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {hasError && (
        <div className="flex items-center gap-1 text-rose-500 text-xs mt-0.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errors[id].message}</span>
        </div>
      )}
    </div>
  );
};

export default TextField;
