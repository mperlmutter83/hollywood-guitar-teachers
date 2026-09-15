'use client';

import { useEffect, useRef, useState } from 'react';

const PHONE_DISPLAY = '(818) 873-6719';
const PHONE_HREF = 'tel:+18188736719';

const EXPERIENCE_OPTIONS = [
  'No experience yet — willing to learn',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5+ years',
];

const inputClass = 'w-full px-4 py-3 border rounded';

export default function WorkForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: '',
    company_website: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  // Spam-gate metadata — initialized after mount to keep render pure
  const submissionId = useRef<string | null>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    if (!submissionId.current) {
      submissionId.current = crypto.randomUUID();
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: 'Looking for Work',
          message: `Experience: ${formData.experience || 'not specified'}. ${formData.message}`.trim(),
          company_website: formData.company_website,
          submission_id: submissionId.current,
          elapsed_ms: Date.now() - startedAt.current,
        }),
      });

      if (response.ok) {
        // GA4/GTM conversion event — picked up by the site's GTM container when present.
        const dlWindow = window as unknown as { dataLayer?: Record<string, unknown>[] };
        dlWindow.dataLayer = dlWindow.dataLayer ?? [];
        dlWindow.dataLayer.push({ event: 'generate_lead' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-3xl">🎉</p>
        <h3 className="mt-3 text-2xl font-bold text-gray-900">You&apos;re on the list!</h3>
        <p className="mt-3 text-gray-600">
          Thanks, {formData.name.split(' ')[0]}! Your details are in. Local businesses that are
          hiring will reach out to you directly.
        </p>
        <p className="mt-4 text-gray-600">
          Want to move faster?{' '}
          <a href={PHONE_HREF} className="font-bold text-indigo-700 underline">
            Call {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — invisible to humans, bots fill it and get silently dropped */}
      <input
        type="text"
        id="company_website"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
        value={formData.company_website}
        onChange={(e) => updateField('company_website', e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
          Experience
        </label>
        <select
          id="experience"
          value={formData.experience}
          onChange={(e) => updateField('experience', e.target.value)}
          className={inputClass}
        >
          <option value="">How much experience do you have?</option>
          {EXPERIENCE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Availability &amp; anything we should know
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="e.g. Available evenings and weekends, have my own transportation, looking for part-time…"
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-indigo-600 text-white px-6 py-3 font-bold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending...' : 'Find Work Near Me'}
      </button>

      {status === 'error' && (
        <div role="alert" className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700 font-medium">
          Something went wrong. Please call us at{' '}
          <a href={PHONE_HREF} className="underline">
            {PHONE_DISPLAY}
          </a>
          .
        </div>
      )}
    </form>
  );
}
