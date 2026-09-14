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
        <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && <nav className="md:hidden px-4 pb-4 space-y-2"><Link href="/" className="block">Home</Link><Link href="/classes" className="block">Classes</Link><Link href="/blogs" className="block">Blogs</Link><Link href="/contact" className="block">Contact</Link></nav>}
    </header>
  );
}
