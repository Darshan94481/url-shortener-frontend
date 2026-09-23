import React, { useState } from 'react';
import { useStoreContext } from '../../contextApi/contextApi';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { Link2, Sparkles, Clipboard, Loader2, ArrowRight } from 'lucide-react';

function CreateNewShorten({ setOpen, refetch }) {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: '',
    },
    mode: 'onTouched',
  });

  const originalUrlValue = watch('originalUrl');

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setValue('originalUrl', text, { shouldValidate: true });
      }
    } catch (err) {
      toast('Clipboard access not permitted or empty', { icon: 'ℹ️' });
    }
  };

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post('/api/urls/shorten', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN || ''}/${res.shortUrl}`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success('Short URL created and copied to clipboard!', {
          position: 'bottom-center',
          duration: 3500,
        });
      });

      await refetch();
      reset();
      setOpen(false);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Failed to create short URL. Please check the URL and try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full relative overflow-hidden p-6 sm:p-8 animate-fadeIn">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Close button */}
      {!loading && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <RxCross2 className="text-xl" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-inner">
          <Link2 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-roboto">
            Create Short Link
          </h2>
          <p className="text-xs text-slate-500">
            Generate a clean, high-performance link with tracking.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(createShortUrlHandler)} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="originalUrl"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wide"
            >
              Destination URL <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              <Clipboard className="w-3 h-3" />
              <span>Paste from clipboard</span>
            </button>
          </div>

          <TextField
            id="originalUrl"
            placeholder="https://example.com/very-long-url-path"
            type="url"
            message="Valid URL is required"
            register={register}
            errors={errors}
            required
          />
        </div>

        {/* Live Preview Box */}
        {originalUrlValue && !errors.originalUrl && (
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-slate-600 animate-fadeIn">
            <span className="font-semibold text-blue-700 block mb-0.5">Preview:</span>
            <span className="font-mono text-blue-600 truncate block">
              {import.meta.env.VITE_REACT_SUBDOMAIN || 'https://linklytics.dev'}/[auto-generated-slug]
            </span>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-custom-gradient text-white font-semibold py-3 rounded-xl shadow-brand-sm hover:shadow-brand-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Short Link...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create & Copy Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewShorten;
