'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-indigo-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">Hollywood Guitar Teachers</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <Link href="/classes" className="hover:text-amber-400">Classes</Link>
          <Link href="/blogs" className="hover:text-amber-400">Blogs</Link>
          <Link href="/contact" className="hover:text-amber-400">Contact</Link>
          <a href="tel:+18188736719" className="text-amber-400 font-bold">(818) 873-6719</a>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <a href="tel:+18188736719" aria-label="Call (818) 873-6719" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold bg-amber-400 text-indigo-900"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>Call</a>
          <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block">Home</Link>
          <Link href="/classes" className="block">Classes</Link>
          <Link href="/blogs" className="block">Blogs</Link>
          <Link href="/contact" className="block">Contact</Link>
          <a href="tel:+18188736719" className="block bg-amber-400 text-indigo-900 px-4 py-2 text-center font-semibold rounded">Call (818) 873-6719</a>
        </nav>
      )}
    </header>
  );
}
