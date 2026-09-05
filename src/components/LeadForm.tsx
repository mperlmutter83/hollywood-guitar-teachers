'use client';

import { useRef, useState } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
};

export default function LeadForm() {
  const [formData, setFormData] = useState(initialForm);
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const submissionId = useRef<string>(crypto.randomUUID());
  const startedAt = useRef<number>(Date.now());

  const inputClass = 'w-full px-4 py-3 border rounded';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact-page',
          submission_id: submissionId.current,
          elapsed_ms: Date.now() - startedAt.current,
          company_website: company,
        }),
      });

      if (response.ok) {
        // GA4/GTM conversion event — picked up by the site's GTM container when present.
        const dlWindow = window as unknown as { dataLayer?: Record<string, unknown>[] };
        dlWindow.dataLayer = dlWindow.dataLayer ?? [];
        dlWindow.dataLayer.push({ event: "generate_lead" });

        setStatus('success');
        setFormData(initialForm);
        setCompany('');
        submissionId.current = crypto.randomUUID();
        startedAt.current = Date.now();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — invisible to humans, passed through to the CRM spam gate */}
      <input
        type="text"
        name="company_website"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <input
        type="text"
        required
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        className={inputClass}
      />
      <input
        type="text"
        required
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        className={inputClass}
      />
      <input
        type="tel"
        required
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className={inputClass}
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={inputClass}
      />
      <textarea
        placeholder="Tell us about your guitar experience and goals"
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-indigo-600 text-white px-6 py-3 font-bold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending...' : 'Submit'}
      </button>

      {status === 'success' && (
        <div role="status" className="rounded border border-green-200 bg-green-50 px-4 py-3 text-green-700 font-medium">
          Thanks! Your message was sent — we&apos;ll be in touch shortly.
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700 font-medium">
          Something went wrong. Please call us at (818) 873-6719.
        </div>
      )}
    </form>
  );
}
