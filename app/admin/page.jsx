'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email atau password salah. Silakan coba lagi.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Navbar / Header */}
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
        
        {/* Logo / Branding Buku Tamu */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Icon Box dengan Gradient Soft */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>

          {/* Teks Branding dengan Gradasi & Tagline */}
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Buku Tamu
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-600/80 -mt-1">
              Digital
            </span>
          </div>
        </Link>

        {/* Tombol Aksi Navigasi */}
        <Link
          href="/"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow-md transition duration-200 flex items-center gap-2"
        >
          <span>Kembali ke Dashboard</span>
        </Link>

      </div>
    </header>

      {/* Container Form Login */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Login Admin</h1>
            <p className="text-sm text-slate-500 mt-2">
              Masuk untuk mengelola data buku tamu.
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 rounded-xl text-sm font-medium bg-rose-50 text-rose-700 border border-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
                placeholder="admin@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}