'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchGuestbook();
  }, [sortAsc]);

  const fetchGuestbook = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: sortAsc });

    if (!error && data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
    router.refresh();
  };

  const filteredEntries = entries.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.institution.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
          
          {/* Branding / Logo Admin */}
          <div className="flex items-center gap-3">
            {/* Icon Box Admin */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-slate-900/10">
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
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5M3.75 12h16.5"
                />
              </svg>
            </div>

            {/* Title & Badge */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg tracking-tight text-slate-900">
                  Dashboard Admin
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-md">
                  Live Data
                </span>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400 -mt-0.5">
                Buku Tamu Digital
              </span>
            </div>
          </div>

          {/* Right Action: User Info & Logout Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 text-xs font-semibold rounded-xl transition duration-200 flex items-center gap-2 shadow-sm hover:shadow"
            >
              <span>Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25"
                />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Cari nama, email, instansi, atau pesan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm"
          />

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="w-full md:w-auto px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-sm transition"
          >
            Urutan: {sortAsc ? 'Terlama Pertama' : 'Terbaru Pertama'}
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm font-medium">
              Memuat data buku tamu...
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm font-medium">
              Tidak ada data buku tamu ditemukan.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Tanggal Submit</th>
                    <th className="p-4">Pesan</th>
                    <th className="p-4">Nama</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Instansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEntries.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="p-4 text-slate-700 max-w-xs break-words">{item.message}</td>
                      <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="p-4 text-slate-600 whitespace-nowrap">{item.email}</td>
                      <td className="p-4 text-slate-600 whitespace-nowrap">{item.institution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}