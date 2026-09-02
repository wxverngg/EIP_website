import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EIP & Associates | Premier Law Firm in Panama',
  description:
    'Leading Panamanian law firm providing elite legal, corporate, immigration, maritime, and accounting services to international corporations and individuals.',
  keywords: [
    'Panama Law Firm',
    'Panama Immigration Lawyers',
    'Corporations Panama',
    'Panama Residency',
    'Maritime Law Panama',
    'Offshore Company Panama',
    'EIP Associates',
  ],
  openGraph: {
    title: 'EIP & Associates | Attorneys at Law Panama',
    description:
      'Premier legal solutions in corporate law, immigration, maritime registration, and wealth structuring in Panama.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EIP & Associates',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#C8A04A] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
