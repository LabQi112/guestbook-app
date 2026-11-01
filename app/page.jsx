'use client';

import { useState } from 'react';
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
    <main className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">Buku Tamu Digital</h1>
        <p className="text-sm text-slate-500 text-center mb-6">
          Silakan isi formulir di bawah ini untuk mengonfirmasi kehadiran atau tinggalkan pesan.
        </p>

        {status.message && (
          <div
            className={`p-4 mb-6 rounded-lg text-sm font-medium ${
              status.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Instansi / Perusahaan</label>
            <input
              type="text"
              name="institution"
              required
              value={formData.institution}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Nama Instansi/Perusahaan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pesan / Kesan</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
              placeholder="Tuliskan pesan atau kesan Anda..."
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition duration-150 disabled:opacity-50 text-sm"
          >
            {status.loading ? 'Mengirim...' : 'Kirim Pesan'}
          </button>
        </form>
      </div>
    </main>
  );
}