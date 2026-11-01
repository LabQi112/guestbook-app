'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';

export default function GuestbookForm() {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: '' });

    const { error } = await supabase.from('guestbook').insert([formData]);

    if (error) {
      setStatus({
        loading: false,
        success: false,
        message: 'Gagal mengirim data. Silakan coba lagi.',
      });
    } else {
      setStatus({
        loading: false,
        success: true,
        message: 'Terima kasih! Pesan Anda berhasil terkirim.',
      });
      setFormData({ name: '', email: '', institution: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800">
      {/* Navbar / Header Publik */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800 text-lg">Buku Tamu</span>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow transition duration-150 flex items-center gap-1.5"
          >
            <span>Portal Admin</span>
            <span>→</span>
          </Link>
        </div>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Buku Tamu Digital</h1>
            <p className="text-sm text-slate-500 mt-2">
              Silakan isi formulir di bawah ini untuk mengonfirmasi kehadiran atau meninggalkan pesan.
            </p>
          </div>

          {status.message && (
            <div
              className={`p-4 mb-6 rounded-xl text-sm font-medium transition-all ${
                status.success
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Instansi / Perusahaan
              </label>
              <input
                type="text"
                name="institution"
                required
                value={formData.institution}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
                placeholder="Nama Instansi/Perusahaan"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Pesan / Kesan
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition resize-none"
                placeholder="Tuliskan pesan atau kesan Anda..."
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50"
            >
              {status.loading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer sederhana */}
      <footer className="text-center py-4 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Buku Tamu Digital. All rights reserved.
      </footer>
    </div>
  );
}