import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Classes' };

export default function ClassesPage() {
  const classes = [
    { name: 'Beginner Guitar Lessons', desc: 'Perfect for those just starting out. Learn basic chords, strumming patterns, and simple songs.', image: '/images/beginner.jpg', price: '$50/hour' },
    { name: 'Intermediate Guitar Lessons', desc: 'Expand your skills with scales, soloing techniques, and music theory.', image: '/images/intermediate.jpg', price: '$60/hour' },
    { name: 'Advanced Guitar Lessons', desc: 'Focus on complex techniques, improvisation, and professional performance.', image: '/images/advanced.jpg', price: '$75/hour' },
    { name: 'Specialty Workshops', desc: 'Workshops on jazz, blues, rock, and classical guitar.', image: '/images/guitar-hero.jpg', price: 'Varies' },
  ];
  return (
    <div>
      <section className="bg-indigo-900 text-white py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-4xl font-bold">Our Classes</h1></div></section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {classes.map((c, i) => (
            <div key={i} className="bg-gray-50 rounded-lg overflow-hidden flex">
              <Image src={c.image} alt={c.name} width={200} height={150} className="w-1/3 object-cover" />
              <div className="p-4 flex-1"><h3 className="font-bold text-gray-900 mb-2">{c.name}</h3><p className="text-gray-600 text-sm mb-2">{c.desc}</p><p className="text-indigo-600 font-bold">{c.price}</p><Link href="/contact" className="inline-block mt-2 text-indigo-600 text-sm">Enroll Now →</Link></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
