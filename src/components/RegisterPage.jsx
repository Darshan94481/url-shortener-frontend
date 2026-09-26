import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import api from '../api/api';
import toast from 'react-hot-toast';
import { User, Mail, Lock, UserPlus, Loader2, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await api.post('/api/auth/public/register', data);
      reset();
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Failed to register. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center px-4 py-12 bg-mesh-gradient">
      <div className="w-full max-w-[440px] relative">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-xl shadow-slate-200/60 rounded-3xl p-5 sm:p-8 md:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-3 shadow-inner">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-roboto">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Start shortening and analyzing your links for free
            </p>
          </div>

          <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
            <TextField
              label="Username"
              required
              id="username"
              type="text"
              message="Username is required"
              placeholder="Choose a username"
              startIcon={User}
              register={register}
              errors={errors}
            />

            <TextField
              label="Email Address"
              required
              id="email"
              type="email"
              message="Email is required"
              placeholder="name@example.com"
              startIcon={Mail}
              register={register}
              errors={errors}
            />

            <TextField
              label="Password"
              required
              id="password"
              type="password"
              message="Password is required"
              placeholder="Create a secure password"
              startIcon={Lock}
              register={register}
              min={6}
              errors={errors}
            />

            <button
              type="submit"
              disabled={loader}
              className="w-full bg-custom-gradient text-white font-semibold rounded-xl py-3 shadow-brand-sm hover:shadow-brand-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm mt-6"
            >
              {loader ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 underline decoration-blue-200 hover:decoration-blue-500 transition-colors ml-1"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
