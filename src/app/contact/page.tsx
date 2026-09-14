import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <div>
      <section className="bg-indigo-900 text-white py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-4xl font-bold">Contact Us</h1></div></section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <LeadForm />
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="font-bold text-xl mb-4">Get in Touch</h2>
            <div className="mb-4"><h3 className="font-bold">Phone</h3><a href="tel:+18188736719" className="text-indigo-600 text-xl font-bold">(818) 873-6719</a></div>
            <div className="mb-4"><h3 className="font-bold">Email</h3><a href="mailto:info@hollywoodguitarteachers.com" className="text-indigo-600">info@hollywoodguitarteachers.com</a></div>
            <div><h3 className="font-bold">Location</h3><p className="text-gray-600">Los Angeles, CA</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
