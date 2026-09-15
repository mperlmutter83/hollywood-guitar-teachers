import type { Metadata } from 'next';
import WorkForm from '@/components/WorkForm';

const PHONE_DISPLAY = '(818) 873-6719';
const PHONE_HREF = 'tel:+18188736719';

export const metadata: Metadata = {
  title: 'Looking for Work',
  description:
    "Looking for guitar teaching work in Hollywood? Local music schools and studios are hiring. Fill out the quick form and we'll connect you — or call (818) 873-6719.",
  alternates: { canonical: 'https://hollywoodguitarteachers.com/looking-for-work' },
};

const STEPS = [
  {
    n: '1',
    title: 'Tell us about yourself',
    body: 'A quick 60-second form — no resume, no cover letter, no endless applications.',
  },
  {
    n: '2',
    title: 'We connect you',
    body: 'We share your details with local guitar teaching businesses that are actively hiring.',
  },
  {
    n: '3',
    title: 'You hear back directly',
    body: 'Interested businesses contact you by phone, usually within a few days.',
  },
];

const WORK_TYPES = [
  'Private Guitar Lessons',
  'Group Classes',
  'Online Lessons',
  'Kids Lessons',
  'Music Theory',
  'Performance Coaching',
];

export default function LookingForWorkPage() {
  return (
    <>
      <section className="bg-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">Looking for Work?</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Guitar Teaching Work in Hollywood
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-gray-300">
            Local music schools and studios are growing and looking for dependable guitar teachers.
            Tell us about yourself and we&apos;ll connect you with businesses that are hiring —
            free, fast, and no obligation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#work-form"
              className="inline-block bg-amber-400 text-indigo-900 px-7 py-3 font-bold hover:bg-amber-300 transition-colors"
            >
              Fill Out the Quick Form
            </a>
            <a
              href={PHONE_HREF}
              className="inline-block border-2 border-amber-400 px-7 py-3 font-bold text-amber-400 hover:bg-amber-400/10 transition-colors"
            >
              Or Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-3xl bg-indigo-50 p-8 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-xl font-bold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">The Kind of Work Available</h2>
          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
            Music schools and studios in Hollywood and the surrounding area hire for a range of
            guitar teaching work, including:
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {WORK_TYPES.map((w) => (
              <li
                key={w}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-gray-700 font-medium shadow-sm"
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work-form" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Apply in 60 Seconds</h2>
          <p className="mt-2 text-center text-gray-600">
            Free and confidential — we&apos;ll only share your details with businesses that are hiring.
          </p>
          <div className="mt-8">
            <WorkForm />
          </div>
        </div>
        <p className="mt-8 text-center text-gray-600">
          Run a music school or studio and need reliable guitar teachers?{' '}
          <a href={PHONE_HREF} className="font-bold text-indigo-700 underline">
            Call {PHONE_DISPLAY}
          </a>
        </p>
      </section>
    </>
  );
}
