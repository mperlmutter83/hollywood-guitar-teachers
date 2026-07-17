import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const lessons = [
    { name: 'Beginner Guitar Lessons', desc: 'Perfect for those just starting out, covering basic chords, strumming patterns, and simple songs.', image: '/images/beginner.jpg' },
    { name: 'Intermediate Guitar Lessons', desc: 'For players looking to expand their skills, including scales, soloing techniques, and music theory.', image: '/images/intermediate.jpg' },
    { name: 'Advanced Guitar Lessons', desc: 'Tailored for advanced players focusing on complex techniques, improvisation, and professional performance.', image: '/images/advanced.jpg' },
    { name: 'Specialty Workshops', desc: 'Join our workshops on genres like jazz, blues, rock, and classical guitar to diversify your playing style.', image: '/images/guitar-hero.jpg' },
  ];
  const testimonials = [
    { quote: "The lessons are fantastic! I've improved so much in just a few months.", author: "Alex M.", stars: 5 },
    { quote: "The teachers are incredibly knowledgeable and patient. Highly recommend!", author: "Jamie L.", stars: 5 },
    { quote: "A wonderful experience! The lessons are fun and very effective.", author: "Chris P.", stars: 5 },
  ];
  return (
    <div>
      <section className="relative min-h-[500px] flex items-center">
        <Image src="/images/guitar-hero.jpg" alt="Guitar" fill className="object-cover" />
        <div className="absolute inset-0 bg-indigo-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-white">
          <p className="text-amber-400 tracking-widest">Master the Art of Guitar Playing</p>
          <h1 className="text-5xl md:text-6xl font-bold mt-2 mb-6">Hollywood Guitar Teacher</h1>
          <p className="text-xl mb-6 max-w-2xl">Unlock your musical potential with personalized guitar lessons from experienced professionals in Los Angeles.</p>
          <Link href="/contact" className="inline-block bg-amber-500 px-8 py-3 font-medium hover:bg-amber-600">Get Started Today</Link>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Guitar Lessons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((l, i) => (
              <div key={i} className="bg-gray-50 rounded-lg overflow-hidden">
                <Image src={l.image} alt={l.name} width={400} height={300} className="w-full h-48 object-cover" />
                <div className="p-4"><h3 className="font-bold text-gray-900 mb-2">{l.name}</h3><p className="text-gray-600 text-sm">{l.desc}</p><Link href="/contact" className="inline-block mt-4 text-indigo-600 font-medium">Learn More →</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-amber-400 mb-4">{'★'.repeat(t.stars)}</div>
                <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
                <p className="font-bold text-gray-900">– {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-indigo-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Master the Guitar?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Sign up for a free trial lesson today and start your musical journey!</p>
        <Link href="/contact" className="inline-block bg-amber-500 px-8 py-3 font-bold hover:bg-amber-600">Book Your Free Trial Lesson</Link>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div><h3 className="font-bold text-lg mb-2">Address</h3><p className="text-gray-600">Los Angeles, CA</p></div>
          <div><h3 className="font-bold text-lg mb-2">Email</h3><a href="mailto:info@hollywoodguitarteacher.com" className="text-indigo-600">info@hollywoodguitarteacher.com</a></div>
        </div>
      </section>
    </div>
  );
}
