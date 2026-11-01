import './globals.css';

export const metadata = {
  title: 'Buku Tamu Digital',
  description: 'Aplikasi Buku Tamu menggunakan Next.js dan Supabase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}