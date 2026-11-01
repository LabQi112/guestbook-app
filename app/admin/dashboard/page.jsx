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
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Dashboard Admin</h1>
            <p className="text-xs text-slate-500">Buku Tamu Digital</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow transition duration-150"
          >
            Logout
          </button>
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
                    <th className="p-4">Nama</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Instansi</th>
                    <th className="p-4">Pesan</th>
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
                      <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="p-4 text-slate-600 whitespace-nowrap">{item.email}</td>
                      <td className="p-4 text-slate-600 whitespace-nowrap">{item.institution}</td>
                      <td className="p-4 text-slate-700 max-w-xs break-words">{item.message}</td>
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