import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/contextApi';
import { User, Lock, LogIn, Loader2, Sparkles, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post(
        '/api/auth/public/login',
        data
      );
      if (response?.token) {
        setToken(response.token);
        localStorage.setItem('JWT_TOKEN', JSON.stringify(response.token));
        toast.success('Welcome back! Login successful.');
        reset();
        navigate('/dashboard');
      } else {
        toast.error('Unexpected response format from server.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid username or password';
      toast.error(message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center px-4 py-12 bg-mesh-gradient">
      <div className="w-full max-w-[440px] relative">
        {/* Ambient Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-xl shadow-slate-200/60 rounded-3xl p-5 sm:p-8 md:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3 shadow-inner">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-roboto">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign in to manage and analyze your short links
            </p>
          </div>

          <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
            <TextField
              label="Username"
              required
              id="username"
              type="text"
              message="Username is required"
              placeholder="Enter your username"
              startIcon={User}
              register={register}
              errors={errors}
            />

            <TextField
              label="Password"
              required
              id="password"
              type="password"
              message="Password is required"
              placeholder="Enter your password"
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 underline decoration-blue-200 hover:decoration-blue-500 transition-colors ml-1"
            >
              Create one for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
