import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <div>
      <section className="bg-indigo-900 text-white py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-4xl font-bold">Contact Us</h1></div></section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <form className="space-y-4">
            <input type="text" placeholder="First Name" className="w-full px-4 py-3 border rounded" />
            <input type="text" placeholder="Last Name" className="w-full px-4 py-3 border rounded" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border rounded" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded" />
            <textarea placeholder="Tell us about your guitar experience and goals" rows={5} className="w-full px-4 py-3 border rounded"></textarea>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 font-bold hover:bg-indigo-700">Submit</button>
          </form>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="font-bold text-xl mb-4">Get in Touch</h2>
            <div className="mb-4"><h3 className="font-bold">Phone</h3><a href="tel:+18188736719" className="text-indigo-600 text-xl font-bold">(818) 873-6719</a></div>
            <div className="mb-4"><h3 className="font-bold">Email</h3><a href="mailto:info@hollywoodguitarteacher.com" className="text-indigo-600">info@hollywoodguitarteacher.com</a></div>
            <div><h3 className="font-bold">Location</h3><p className="text-gray-600">Los Angeles, CA</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
